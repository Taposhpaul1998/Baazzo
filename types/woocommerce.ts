/**
 * WooCommerce REST API TypeScript Types
 * WooCommerce v3 API response এর সব common type এখানে আছে।
 */

// ── Image ─────────────────────────────────────────────────────
export interface WooImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

// ── Category ──────────────────────────────────────────────────
export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: WooImage | null;
  menu_order: number;
  count: number;
}

// ── Product Attribute ─────────────────────────────────────────
export interface WooAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

// ── Product ───────────────────────────────────────────────────
export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  type: "simple" | "variable" | "grouped" | "external";
  status: "publish" | "draft" | "pending" | "private";
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  average_rating: string;
  rating_count: number;
  short_description: string;
  description: string;
  images: WooImage[];
  categories: { id: number; name: string; slug: string }[];
  attributes: WooAttribute[];
  variations: number[];
}

// ── API Response Wrappers ─────────────────────────────────────
export interface ProductsResponse {
  data: WooProduct[];
  total: number;
  totalPages: number;
}

export interface CategoryListResponse {
  data: WooCategory[];
  total: number;
  totalPages: number;
}

// ── Query Params ──────────────────────────────────────────────
export interface ProductQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string; // category id
  orderby?: "date" | "id" | "title" | "price" | "popularity" | "rating";
  order?: "asc" | "desc";
  on_sale?: boolean;
  stock_status?: "instock" | "outofstock" | "onbackorder";
  min_price?: string;
  max_price?: string;
}

export interface CategoryQueryParams {
  page?: number;
  per_page?: number;
  parent?: number;
  orderby?: "id" | "include" | "name" | "slug" | "term_group" | "description" | "count";
  order?: "asc" | "desc";
  hide_empty?: boolean;
}
