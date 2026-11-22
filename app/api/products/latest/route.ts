/**
 * GET /api/products/latest
 *
 * WooCommerce Store API (/wp-json/wc/store/v1/products) ব্যবহার করে
 * সবচেয়ে নতুন ৮টি published product return করে।
 */

import { NextResponse } from "next/server";
import { wooStoreFetch, mapStoreProductToWooProduct } from "@/lib/woocommerce";
import type { WooProduct, WooStoreProduct } from "@/types/woocommerce";

export async function GET() {
  try {
    const storeProducts = await wooStoreFetch<WooStoreProduct[]>(
      "/products?per_page=8&orderby=date&order=desc",
      { next: { revalidate: 300 } } // 5 মিনিট cache
    );

    const products: WooProduct[] = (storeProducts ?? []).map(mapStoreProductToWooProduct);

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
    console.error("[/api/products/latest - Store API]", error);
    return NextResponse.json(
      { error: "Failed to fetch latest products via Store API." },
      { status: 500 }
    );
  }
}
