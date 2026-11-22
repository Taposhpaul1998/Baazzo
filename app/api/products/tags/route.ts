/**
 * GET /api/products/tags
 *
 * Query params (all optional):
 *   page        — page number (default: 1)
 *   per_page    — items per page (default: 50, max: 100)
 *   hide_empty  — true = empty tags hide করবে (default: true)
 *   orderby     — id | name | slug | count
 *   order       — asc | desc
 */

import { wooFetchWithMeta } from "@/lib/woocommerce";
import { connection, NextRequest, NextResponse } from "next/server";

export interface WooTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const ALLOWED_ORDERBY = ["id", "name", "slug", "count"] as const;
const ALLOWED_ORDER = ["asc", "desc"] as const;

export async function GET(req: NextRequest) {
  await connection();
  try {
    const { searchParams } = req.nextUrl;

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
    const per_page = Math.min(100, Math.max(1, parseInt(searchParams.get("per_page") ?? "50", 10) || 50));
    const hide_empty = searchParams.get("hide_empty") !== "false";

    const rawOrderby = searchParams.get("orderby") ?? "count";
    const orderby = ALLOWED_ORDERBY.includes(rawOrderby as (typeof ALLOWED_ORDERBY)[number])
      ? rawOrderby
      : "count";

    const rawOrder = searchParams.get("order") ?? "desc";
    const order = ALLOWED_ORDER.includes(rawOrder as "asc" | "desc") ? rawOrder : "desc";

    const params = new URLSearchParams({
      page: String(page),
      per_page: String(per_page),
      orderby,
      order,
      hide_empty: String(hide_empty),
    });

    const { data, total, totalPages } = await wooFetchWithMeta<WooTag[]>(
      `/products/tags?${params.toString()}`
    );

    return NextResponse.json(
      { data, total, totalPages, page, per_page },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("[/api/products/tags]", error);
    return NextResponse.json(
      { error: "Failed to fetch tags. Please try again later." },
      { status: 500 }
    );
  }
}
