/**
 * GET /api/products
 *
 * Query params (সব optional):
 *   page        — page number (default: 1)
 *   per_page    — items per page (default: 12, max: 100)
 *   search      — search keyword
 *   category    — category id
 *   orderby     — date | title | price | popularity | rating
 *   order       — asc | desc
 *   on_sale     — true | false
 *   min_price   — minimum price
 *   max_price   — maximum price
 *   stock_status — instock | outofstock
 *
 * Example: /api/products?page=1&per_page=12&category=23&orderby=price&order=asc
 */

import { connection } from "next/server";
import { NextRequest, NextResponse } from "next/server";
import { wooFetchWithMeta } from "@/lib/woocommerce";
import type { WooProduct, ProductQueryParams } from "@/types/woocommerce";

// Allowed orderby values — injection থেকে রক্ষা
const ALLOWED_ORDERBY = ["date", "id", "title", "price", "popularity", "rating"] as const;
const ALLOWED_ORDER = ["asc", "desc"] as const;
const ALLOWED_STOCK = ["instock", "outofstock", "onbackorder"] as const;

export async function GET(req: NextRequest) {
  // Opt out of prerendering — this route depends on runtime request data
  await connection();
  try {
    const { searchParams } = req.nextUrl;

    // ── Input validation & sanitization ───────────────────────
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
    const per_page = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("per_page") ?? "12", 10) || 12)
    );

    const search = searchParams.get("search")?.trim().slice(0, 100) ?? "";
    const category = searchParams.get("category")?.replace(/\D/g, "") ?? ""; // শুধু digits
    const min_price = searchParams.get("min_price")?.replace(/[^\d.]/g, "") ?? "";
    const max_price = searchParams.get("max_price")?.replace(/[^\d.]/g, "") ?? "";

    const rawOrderby = searchParams.get("orderby") ?? "date";
    const orderby = ALLOWED_ORDERBY.includes(
      rawOrderby as (typeof ALLOWED_ORDERBY)[number]
    )
      ? rawOrderby
      : "date";

    const rawOrder = searchParams.get("order") ?? "desc";
    const order = ALLOWED_ORDER.includes(rawOrder as "asc" | "desc") ? rawOrder : "desc";

    const rawStock = searchParams.get("stock_status") ?? "";
    const stock_status = ALLOWED_STOCK.includes(
      rawStock as (typeof ALLOWED_STOCK)[number]
    )
      ? rawStock
      : "";

    const on_sale = searchParams.get("on_sale") === "true" ? "true" : "";

    // ── Build WooCommerce query string ─────────────────────────
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(per_page),
      orderby,
      order,
      status: "publish",
    });

    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (min_price) params.set("min_price", min_price);
    if (max_price) params.set("max_price", max_price);
    if (stock_status) params.set("stock_status", stock_status);
    if (on_sale) params.set("on_sale", on_sale);

    // ── Fetch from WooCommerce (server-side only) ──────────────
    const { data, total, totalPages } = await wooFetchWithMeta<WooProduct[]>(
      `/products?${params.toString()}`
    );

    return NextResponse.json(
      { data, total, totalPages, page, per_page },
      {
        status: 200,
        headers: {
          // Browser cache: 2 min, CDN cache: 10 min
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("[/api/products]", error);
    return NextResponse.json(
      { error: "Failed to fetch products. Please try again later." },
      { status: 500 }
    );
  }
}
