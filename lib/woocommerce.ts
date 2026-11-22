/**
 * WooCommerce Server-Only Client
 *
 * এই ফাইল শুধু server-side এ চলবে।
 * Consumer Key ও Secret কখনো browser এ যাবে না।
 *
 * Usage:
 *   import { wooFetch } from "@/lib/woocommerce";
 *   const products = await wooFetch("/products?per_page=12");
 */

import "server-only";
import { decodeHtmlEntities } from "@/lib/formatters";
export { decodeHtmlEntities };
import type {
  WooCategory,
  WooImage,
  WooProduct,
  WooStoreProduct,
} from "@/types/woocommerce";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// Startup check — missing env vars থাকলে সাথে সাথে জানাবে
if (!BASE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
  throw new Error(
    "[WooCommerce] Missing environment variables. " +
      "Check WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET in .env.local"
  );
}

/**
 * WooCommerce REST API v3 কে authenticated fetch করে।
 * @param endpoint  — "/products", "/products/123", "/categories" ইত্যাদি
 * @param options   — optional RequestInit (method, cache, next revalidate)
 */
export async function wooFetch<T>(
  endpoint: string,
  options: RequestInit & { next?: { revalidate?: number } } = {}
): Promise<T> {
  // Basic Auth — base64(key:secret) — সম্পূর্ণ server-side
  const credentials = Buffer.from(
    `${CONSUMER_KEY}:${CONSUMER_SECRET}`
  ).toString("base64");

  // endpoint এ already ? থাকলে & দিয়ে জোড়া, না থাকলে ? দিয়ে শুরু
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}/wp-json/wc/v3${endpoint}${separator}_fields=id,name,slug,sku,price,regular_price,sale_price,stock_status,images,categories,short_description,description,attributes,variations,type,rating_count,average_rating,on_sale`;

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    // Default: 10 মিনিট cache, পরে revalidate
    next: { revalidate: 600, ...options.next },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `[WooCommerce] API error ${res.status} on "${endpoint}": ${errorText}`
    );
  }

  return res.json() as Promise<T>;
}

/**
 * WooCommerce Store API v1 fetch করে (Public / headless storefront API).
 * @param endpoint  — "/products", "/cart" ইত্যাদি
 */
export async function wooStoreFetch<T>(
  endpoint: string,
  options: RequestInit & { next?: { revalidate?: number } } = {}
): Promise<T> {
  const url = `${BASE_URL}/wp-json/wc/store/v1${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    next: { revalidate: 300, ...options.next },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `[WooCommerce Store API] error ${res.status} on "${endpoint}": ${errorText}`
    );
  }

  return res.json() as Promise<T>;
}

/**
 * Fetches Store API data together with pagination headers.
 * Store API exposes totals through X-WP-Total and X-WP-TotalPages.
 */
export async function wooStoreFetchWithMeta<T>(
  endpoint: string,
  options: RequestInit & { next?: { revalidate?: number } } = {}
): Promise<{ data: T; total: number; totalPages: number }> {
  const url = `${BASE_URL}/wp-json/wc/store/v1${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    next: { revalidate: 300, ...options.next },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `[WooCommerce Store API] error ${res.status} on "${endpoint}": ${errorText}`
    );
  }

  const data = (await res.json()) as T;
  const total = Number(res.headers.get("X-WP-Total") ?? 0);
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);

  return { data, total, totalPages };
}

/**
 * Maps WooCommerce Store API product response to WooProduct interface.
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
    categories: (p.categories ?? []).map((c: Partial<Pick<WooCategory, "id" | "name" | "slug">>) => ({
      id: c.id ?? 0,
      name: decodeHtmlEntities(c.name ?? ""),
      slug: c.slug ?? "",
    })),
    attributes: (p.attributes ?? [])
      .map((attribute) => ({
        ...attribute,
        options:
          attribute.options?.length
            ? attribute.options
            : (attribute.terms ?? []).map((term) => term.name),
      }))
      .filter((attribute) => attribute.options.length > 0),
    variations: p.variations ?? [],
    price_range: p.prices?.price_range ?? p.price_range ?? null,
  };
}

/**
 * Response header থেকে total product/category count বের করে।
 * WooCommerce X-WP-Total header ব্যবহার করে।
 */
export async function wooFetchWithMeta<T>(
  endpoint: string,
  options: RequestInit & { next?: { revalidate?: number } } = {}
): Promise<{ data: T; total: number; totalPages: number }> {
  const credentials = Buffer.from(
    `${CONSUMER_KEY}:${CONSUMER_SECRET}`
  ).toString("base64");

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}/wp-json/wc/v3${endpoint}${separator}_fields=id,name,slug,sku,price,regular_price,sale_price,stock_status,images,categories,short_description,description,attributes,variations,type,rating_count,average_rating,on_sale`;

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    next: { revalidate: 600, ...options.next },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `[WooCommerce] API error ${res.status} on "${endpoint}": ${errorText}`
    );
  }

  const data = (await res.json()) as T;
  const total = parseInt(res.headers.get("X-WP-Total") ?? "0", 10);
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);

  return { data, total, totalPages };
}
