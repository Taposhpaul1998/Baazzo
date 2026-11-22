/**
 * GET /api/products/[slug]/variations
 *
 * Variable product-এর সব variations server-side-এ Store API থেকে fetch করে।
 */

import { connection } from "next/server";
import { NextResponse } from "next/server";
import { wooStoreFetch } from "@/lib/woocommerce";
import type { WooStoreProduct } from "@/types/woocommerce";

interface WooVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  status: string;
  image: { id: number; src: string; alt: string } | null;
  attributes: { id: number; name: string; option: string }[];
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connection();
  const { slug } = await params;

  try {
    // 1️⃣ Store API দিয়ে product খোঁজো যাতে ID এবং variations array পাওয়া যায়
    const storeProducts = await wooStoreFetch<WooStoreProduct[]>(
      `/products?slug=${encodeURIComponent(slug)}&status=publish`
    );

    if (!storeProducts.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = storeProducts[0];

    if (product.type !== "variable" || !product.variations?.length) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    // 2️⃣ Store API দিয়ে প্রতিটি variation fetch করো
    const variationPromises = product.variations.map(async (vId) => {
      try {
        const v = await wooStoreFetch<WooStoreProduct>(`/products/${vId}`);
        const img = v.images?.[0];
        return {
          id: v.id,
          price: v.prices?.price ?? v.price ?? "",
          regular_price: v.prices?.regular_price ?? v.regular_price ?? "",
          sale_price: v.prices?.sale_price ?? v.sale_price ?? "",
          stock_status: v.is_in_stock !== false ? "instock" : "outofstock",
          status: v.status ?? "publish",
          image: img
            ? {
                id: img.id ?? 0,
                src: img.src ?? "",
                alt: img.alt ?? "",
              }
            : null,
          attributes: (v.attributes ?? []).map((attr) => ({
            id: attr.id ?? 0,
            name: attr.name ?? "",
            option: attr.options?.[0] ?? "",
          })),
        };
      } catch {
        return null;
      }
    });

    const variations = (await Promise.all(variationPromises)).filter(
      (v): v is WooVariation => v !== null
    );

    const publishedVariations = variations.filter((v) => v.status === "publish");

    return NextResponse.json(
      { data: publishedVariations },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
        },
      }
    );
  } catch (err) {
    console.error("[product-variations]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
