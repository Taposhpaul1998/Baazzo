/**
 * GET /api/products/[slug]
 *
 * slug দিয়ে single product আনে।
 * Example: /api/products/blue-denim-jacket
 */

import { NextRequest, NextResponse } from "next/server";
import { wooFetch } from "@/lib/woocommerce";
import type { WooProduct } from "@/types/woocommerce";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // slug validate — শুধু alphanumeric, hyphen, underscore allow
    if (!slug || !/^[a-z0-9_-]+$/i.test(slug)) {
      return NextResponse.json(
        { error: "Invalid product slug." },
        { status: 400 }
      );
    }

    // slug দিয়ে product search করি
    const products = await wooFetch<WooProduct[]>(
      `/products?slug=${encodeURIComponent(slug)}&status=publish`
    );

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: products[0] },
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
