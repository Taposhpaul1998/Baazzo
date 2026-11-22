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

// WooCommerce Store API product response
export interface WooStoreProduct {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  type?: string;
  status?: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  on_sale?: boolean;
  price_range?: {
    min_amount?: string;
    max_amount?: string;
    [key: string]: unknown;
  } | null;
  prices?: {
    price?: string;
    regular_price?: string;
    sale_price?: string;
    price_range?: {
      min_amount?: string;
      max_amount?: string;
      [key: string]: unknown;
    } | null;
  };
  is_on_sale?: boolean;
  is_in_stock?: boolean;
  average_rating?: string | number;
  review_count?: number;
  rating_count?: number;
  short_description?: string;
  description?: string;
  images?: Array<Partial<WooImage>>;
  categories?: Array<Partial<Pick<WooCategory, "id" | "name" | "slug">>>;
  attributes?: WooAttribute[];
  variations?: number[];
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
  has_variations?: boolean;
  terms?: Array<{ id: number; name: string; slug: string }>;
}

export interface WooVariationAttribute {
  id?: number;
  name: string;
  option?: string;
  value?: string;
}

export interface WooVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  image?: WooImage;
  attributes: WooVariationAttribute[];
  status: string;
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
  price_range?: {
    min_amount?: string;
    max_amount?: string;
  } | string | null;
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
