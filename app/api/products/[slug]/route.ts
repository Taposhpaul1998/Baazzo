/**
 * GET /api/products/[slug]
 *
 * slug দিয়ে single product আনে।
 * Example: /api/products/blue-denim-jacket
 */

import { wooStoreFetch, mapStoreProductToWooProduct } from "@/lib/woocommerce";
import type { WooProduct, WooStoreProduct } from "@/types/woocommerce";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // slug validate — path traversal & length check
    if (!slug || typeof slug !== "string" || slug.length > 255 || /[/\\]/.test(slug) || slug.includes("..")) {
      return NextResponse.json(
        { error: "Invalid product slug." },
        { status: 400 }
      );
    }

    // slug দিয়ে product search করি Store API থেকে
    const storeProducts = await wooStoreFetch<WooStoreProduct[]>(
      `/products?slug=${encodeURIComponent(slug)}&status=publish`,
      { next: { revalidate: 600 } }
    );

    if (!storeProducts || storeProducts.length === 0) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const product: WooProduct = mapStoreProductToWooProduct(storeProducts[0]);

    return NextResponse.json(
      { data: product },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("[/api/products/[slug]]", error);
    return NextResponse.json(
      { error: "Failed to fetch product. Please try again later." },
      { status: 500 }
    );
  }
}
