// /**
//  * GET /api/categories
//  *
//  * Query params (সব optional):
//  *   page        — page number (default: 1)
//  *   per_page    — items per page (default: 20, max: 100)
//  *   parent      — parent category id (0 = top-level only)
//  *   hide_empty  — true = empty category লুকাবে (default: true)
//  *   orderby     — id | name | slug | count
//  *   order       — asc | desc
//  *
//  * Example: /api/categories?parent=0&hide_empty=true&per_page=20
//  */

// import { connection } from "next/server";
// import { NextRequest, NextResponse } from "next/server";
// import { wooFetchWithMeta } from "@/lib/woocommerce";
// import type { WooCategory } from "@/types/woocommerce";

// const ALLOWED_ORDERBY = ["id", "include", "name", "slug", "term_group", "description", "count"] as const;
// const ALLOWED_ORDER = ["asc", "desc"] as const;

// export async function GET(req: NextRequest) {
//   // Opt out of prerendering — this route depends on runtime request data
//   await connection();
//   try {
//     const { searchParams } = req.nextUrl;

//     // ── Input validation ───────────────────────────────────────
//     const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
//     const per_page = Math.min(
//       100,
//       Math.max(1, parseInt(searchParams.get("per_page") ?? "20", 10) || 20)
//     );

//     const parentRaw = searchParams.get("parent");
//     const parent = parentRaw !== null ? parentRaw.replace(/\D/g, "") : "";

//     const hide_empty = searchParams.get("hide_empty") !== "false"; // default true

//     const rawOrderby = searchParams.get("orderby") ?? "name";
//     const orderby = ALLOWED_ORDERBY.includes(rawOrderby as typeof ALLOWED_ORDERBY[number])
//       ? rawOrderby
//       : "name";

//     const rawOrder = searchParams.get("order") ?? "asc";
//     const order = ALLOWED_ORDER.includes(rawOrder as "asc" | "desc") ? rawOrder : "asc";

//     // ── Build query ────────────────────────────────────────────
//     const params = new URLSearchParams({
//       page: String(page),
//       per_page: String(per_page),
//       orderby,
//       order,
//       hide_empty: String(hide_empty),
//     });

//     if (parent !== "") params.set("parent", parent);

//     // ── Fetch ──────────────────────────────────────────────────
//     const { data, total, totalPages } = await wooFetchWithMeta<WooCategory[]>(
//       `/products/categories?${params.toString()}`
//     );

//     return NextResponse.json(
//       { data, total, totalPages, page, per_page },
//       {
//         status: 200,
//         headers: {
//           // Categories কম পরিবর্তন হয়, তাই 30 মিনিট cache
//           "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("[/api/categories]", error);
//     return NextResponse.json(
//       { error: "Failed to fetch categories. Please try again later." },
//       { status: 500 }
//     );
//   }
// }
