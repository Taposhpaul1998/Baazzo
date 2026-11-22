/**
 * GET /api/products/[slug]/variations
 *
 * Variable product-এর সব variations server-side-এ fetch করে।
 */

import { connection } from "next/server";
import { NextResponse } from "next/server";
import { wooStoreFetch, wooFetch } from "@/lib/woocommerce";
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
    // 1️⃣ Store API দিয়ে product খোঁজো যাতে ID পাওয়া যায়
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

    // 2️⃣ REST API দিয়ে variations fetch করো
    const variations = await wooFetch<WooVariation[]>(
      `products/${product.id}/variations?per_page=100&_fields=id,price,regular_price,sale_price,stock_status,image,attributes,status`
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
