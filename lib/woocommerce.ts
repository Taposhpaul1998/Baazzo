/**
 * WooCommerce Store API Client
 *
 * Headless storefront API (/wp-json/wc/store/v1) এর জন্য হেল্পার ফাংশন।
 * Consumer Key / Secret প্রয়োজন নেই।
 *
 * Usage:
 *   import { wooStoreFetch, wooStoreFetchWithMeta, mapStoreProductToWooProduct } from "@/lib/woocommerce";
 *   const products = await wooStoreFetch<WooStoreProduct[]>("/products?per_page=12");
 */

import { decodeHtmlEntities } from "@/lib/formatters";
import type {
  WooCategory,
  WooImage,
  WooProduct,
  WooStoreProduct,
} from "@/types/woocommerce";

export { decodeHtmlEntities };

const BASE_URL = process.env.WOOCOMMERCE_URL?.replace(/\/+$/, "");

if (!BASE_URL) {
  throw new Error(
    "[WooCommerce] Missing environment variable: WOOCOMMERCE_URL. Check .env.local"
  );
}

type WooRequestOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

function buildStoreUrl(endpoint: string): string {
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${BASE_URL}/wp-json/wc/store/v1${normalizedEndpoint}`;
}

async function parseErrorResponse(res: Response, endpoint: string): Promise<never> {
  let details = "";
  try {
    details = await res.text();
  } catch {
    details = res.statusText;
  }

  throw new Error(
    `[WooCommerce Store API] Request failed (${res.status}) on "${endpoint}": ${details}`
  );
}

/**
 * WooCommerce Store API v1 থেকে JSON ডেটা ফেচ করে।
 */
export async function wooStoreFetch<T>(
  endpoint: string,
  options: WooRequestOptions = {}
): Promise<T> {
  const { headers, next, ...restOptions } = options;
  const url = buildStoreUrl(endpoint);

  const res = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    next: {
      revalidate: 300,
      ...next,
    },
  });

  if (!res.ok) {
    await parseErrorResponse(res, endpoint);
  }

  return (await res.json()) as T;
}

/**
 * Store API ডেটার সাথে pagination headers (X-WP-Total, X-WP-TotalPages) রিটার্ন করে।
 */
export async function wooStoreFetchWithMeta<T>(
  endpoint: string,
  options: WooRequestOptions = {}
): Promise<{ data: T; total: number; totalPages: number }> {
  const { headers, next, ...restOptions } = options;
  const url = buildStoreUrl(endpoint);

  const res = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    next: {
      revalidate: 300,
      ...next,
    },
  });

  if (!res.ok) {
    await parseErrorResponse(res, endpoint);
  }

  const data = (await res.json()) as T;
  const totalHeader = res.headers.get("X-WP-Total");
  const totalPagesHeader = res.headers.get("X-WP-TotalPages");

  const total = totalHeader ? Number.parseInt(totalHeader, 10) || 0 : 0;
  const totalPages = totalPagesHeader ? Math.max(1, Number.parseInt(totalPagesHeader, 10) || 1) : 1;

  return { data, total, totalPages };
}

/**
 * Store API প্রোডাক্ট রেসপন্সকে অ্যাপের স্ট্যান্ডার্ড WooProduct ফরম্যাটে ম্যাপ করে।
 */
export function mapStoreProductToWooProduct(p: WooStoreProduct): WooProduct {
  return {
    id: p.id,
    name: decodeHtmlEntities(p.name ?? ""),
    slug: p.slug,
    sku: p.sku ?? "",
    type: (p.type ?? "simple") as WooProduct["type"],
    status: (p.status ?? "publish") as WooProduct["status"],
    price: p.prices?.price ?? p.price ?? "",
    regular_price: p.prices?.regular_price ?? p.regular_price ?? "",
    sale_price: p.prices?.sale_price ?? p.sale_price ?? "",
    on_sale: p.is_on_sale ?? p.on_sale ?? false,
    stock_status: p.is_in_stock !== false ? "instock" : "outofstock",
    average_rating: String(p.average_rating ?? "0"),
    rating_count: p.review_count ?? p.rating_count ?? 0,
    short_description: p.short_description ?? "",
    description: p.description ?? "",
    images: (p.images ?? []).map((img: Partial<WooImage>) => ({
      id: img.id ?? 0,
      src: img.src ?? "",
      name: img.name ?? "",
      alt: decodeHtmlEntities(img.alt ?? ""),
    })),
    categories: (p.categories ?? []).map(
      (c: Partial<Pick<WooCategory, "id" | "name" | "slug">>) => ({
        id: c.id ?? 0,
        name: decodeHtmlEntities(c.name ?? ""),
        slug: c.slug ?? "",
      })
    ),
    attributes: (p.attributes ?? [])
      .map((attribute) => ({
        ...attribute,
        options: attribute.options?.length
          ? attribute.options
          : (attribute.terms ?? []).map((term) => term.name),
      }))
      .filter((attribute) => attribute.options.length > 0),
    variations: p.variations ?? [],
    price_range: p.prices?.price_range ?? p.price_range ?? null,
  };
}