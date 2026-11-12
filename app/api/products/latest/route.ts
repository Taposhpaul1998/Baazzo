/**
 * GET /api/products/latest
 *
 * সবচেয়ে নতুন ৮টি published product return করে।
 * orderby=date, order=desc, per_page=8 — fixed, কোনো query param নেই।
 */

import { NextResponse } from "next/server";
import { wooFetch } from "@/lib/woocommerce";
import type { WooProduct } from "@/types/woocommerce";

export async function GET() {
  try {
    const products = await wooFetch<WooProduct[]>(
      "/products?per_page=8&orderby=date&order=desc&status=publish",
      { next: { revalidate: 300 } } // 5 মিনিট cache
    );

    return NextResponse.json(
      { data: products, count: products.length },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("[/api/products/latest]", error);
    return NextResponse.json(
      { error: "Failed to fetch latest products." },
      { status: 500 }
    );
  }
}
