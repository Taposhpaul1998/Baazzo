import { connection, NextRequest, NextResponse } from "next/server";
import {
  mapStoreProductToWooProduct,
  wooStoreFetch,
  wooStoreFetchWithMeta,
} from "@/lib/woocommerce";
import type { WooCategory, WooProduct, WooStoreProduct } from "@/types/woocommerce";

/**
 * GET /api/categories/[slug]
 *
 * Client থেকে category slug নিয়ে category ID (এবং subcategories) বের করে
 * WooCommerce Store API থেকে paginated products নিয়ে আসে:
 * /products?category={ids}&page={page}&per_page={perPage}
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connection();

  const { slug: rawSlug } = await params;
  const slug = rawSlug.trim().slice(0, 100);

  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid category slug" }, { status: 400 });
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
    const perPage = Math.min(
      100,
      Math.max(1, Number(searchParams.get("per_page") ?? "15") || 15)
    );

    // 1. Fetch categories to map slug to category ID + subcategory IDs
    const allCategories = await wooStoreFetch<WooCategory[]>(
      "/products/categories?per_page=100",
      { next: { revalidate: 1800 } }
    );

    const targetCategory = allCategories.find((c) => c.slug === slug);

    let categoryQueryParam = "";
    if (targetCategory) {
      const ids = [targetCategory.id];
      const children = allCategories.filter((c) => c.parent === targetCategory.id);
      for (const child of children) {
        ids.push(child.id);
        const grandChildren = allCategories.filter((c) => c.parent === child.id);
        for (const gc of grandChildren) {
          ids.push(gc.id);
        }
      }
      categoryQueryParam = ids.join(",");
    }

    const queryParam = categoryQueryParam || encodeURIComponent(slug);

    const response = await wooStoreFetchWithMeta<WooStoreProduct[]>(
      `/products?category=${queryParam}&page=${page}&per_page=${perPage}`,
      { next: { revalidate: 300 } }
    );

    const data: WooProduct[] = (response.data ?? []).map(
      mapStoreProductToWooProduct
    );

    return NextResponse.json(
      {
        data,
        total: response.total,
        totalPages: response.totalPages,
        page,
        per_page: perPage,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("[/api/categories/[slug]]", error);
    return NextResponse.json(
      { error: "Failed to fetch category products" },
      { status: 500 }
    );
  }
}
