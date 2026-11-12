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
