/**
 * GET /api/products/trending
 *
 * WooCommerce Store API (/wp-json/wc/store/v1/products) ব্যবহার করে
 * সবচেয়ে বেশি জনপ্রিয় / trending ৮টি product return করে।
 */

import { NextResponse } from "next/server";
import { wooStoreFetch, mapStoreProductToWooProduct } from "@/lib/woocommerce";
import type { WooProduct, WooStoreProduct } from "@/types/woocommerce";

export async function GET() {
  try {
    const storeProducts = await wooStoreFetch<WooStoreProduct[]>(
      "/products?per_page=8&orderby=popularity&order=desc",
      { next: { revalidate: 600 } } // ১০ মিনিট cache
    );

    const products: WooProduct[] = (storeProducts ?? []).map(mapStoreProductToWooProduct);

    return NextResponse.json(
      { data: products, count: products.length },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("[/api/products/trending - Store API]", error);
    return NextResponse.json(
      { error: "Failed to fetch trending products via Store API." },
      { status: 500 }
    );
  }
}
