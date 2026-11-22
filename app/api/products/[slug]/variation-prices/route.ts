/**
 * GET /api/products/[slug]/variation-prices
 *
 * Variable product-এর variation prices server-side-এ Store API থেকে fetch করে।
 *
 * Response shape:
 *   { type: "simple" | "variable", min: number|null, max: number|null, formatted: string }
 */

import { connection } from "next/server";
import { NextResponse } from "next/server";
import { wooStoreFetch } from "@/lib/woocommerce";
import type { WooStoreProduct } from "@/types/woocommerce";

// ৳ format helper
function formatPrice(amount: number): string {
  return `৳ ${amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Dynamic rendering opt-out (prerender block করবে না)
  await connection();

  const { slug } = await params;

  try {
    // 1️⃣ Store API দিয়ে product খোঁজো
    const storeProducts = await wooStoreFetch<WooStoreProduct[]>(
      `/products?slug=${encodeURIComponent(slug)}&status=publish`
    );

    if (!storeProducts.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = storeProducts[0];
    const isVariable = product.type === "variable";

    // 2️⃣ Simple product → সরাসরি return
    if (!isVariable || !product.variations?.length) {
      const price = parseFloat(product.prices?.price ?? product.price ?? "0") || 0;
      return NextResponse.json(
        {
          type: "simple",
          min: price,
          max: price,
          formatted: formatPrice(price),
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
          },
        }
      );
    }

    // 3️⃣ Variable product: Check price_range from Store API first
    const priceRange = product.prices?.price_range ?? product.price_range;
    if (priceRange && typeof priceRange === "object" && priceRange.min_amount && priceRange.max_amount) {
      const min = parseFloat(priceRange.min_amount) || 0;
      const max = parseFloat(priceRange.max_amount) || 0;
      const formatted =
        min === max ? formatPrice(min) : `${formatPrice(min)} – ${formatPrice(max)}`;

      return NextResponse.json(
        { type: "variable", min, max, formatted },
        {
          headers: {
            "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
          },
        }
      );
    }

    // 4️⃣ Fallback: Variable product → variations fetch via Store API
    const variationPromises = product.variations.map(async (vId) => {
      try {
        const v = await wooStoreFetch<WooStoreProduct>(`/products/${vId}`);
        return {
          price: v.prices?.price ?? v.price ?? "",
          status: v.status ?? "publish",
        };
      } catch {
        return null;
      }
    });

    const variations = (await Promise.all(variationPromises)).filter(Boolean);

    // Published variations শুধু
    const prices = variations
      .filter((v) => v && v.status === "publish" && v.price !== "")
      .map((v) => parseFloat(v!.price))
      .filter((p) => !isNaN(p) && p > 0);

    if (!prices.length) {
      return NextResponse.json(
        { type: "variable", min: null, max: null, formatted: "Price on request" },
        {
          headers: {
            "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
          },
        }
      );
    }

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    const formatted =
      min === max ? formatPrice(min) : `${formatPrice(min)} – ${formatPrice(max)}`;

    return NextResponse.json(
      { type: "variable", min, max, formatted },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
        },
      }
    );
  } catch (err) {
    console.error("[variation-prices]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
