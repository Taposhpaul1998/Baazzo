"use client";

import ProductCard from "@/app/components/home/ProductCard";
import type { WooProduct } from "@/types/woocommerce";
import { useCallback, useEffect, useRef, startTransition, useState } from "react";
import { FiGrid, FiPackage } from "react-icons/fi";
import type { ShopFilterState } from "./ShopFilters";

const PER_PAGE = 15;

interface Props {
  filters: ShopFilterState;
  productsEndpoint?: string;
}

function SkeletonCard() {
  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-pulse">
      <div className="aspect-square bg-slate-700" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-slate-700 rounded w-1/2" />
        <div className="h-8 bg-slate-700 rounded mt-3" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-3 flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-5">
        <FiPackage className="w-9 h-9 text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-200 mb-2">
        No products found
      </h3>
      <p className="text-sm text-slate-500 max-w-xs">
        No products are available in this category.
      </p>
    </div>
  );
}

export default function ShopProductGrid({
  filters,
  productsEndpoint = "/api/products",
}: Props) {
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep a ref to the current filters so the observer callback always sees fresh values
  const filtersRef = useRef(filters);
  useEffect(() => {
    filtersRef.current = filters;
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Build query string from filters + page
  const buildQuery = useCallback(
    (f: ShopFilterState, p: number) => {
      const params = new URLSearchParams({
        page: String(p),
        per_page: String(PER_PAGE),
        orderby: f?.orderby ?? "date",
        order: f?.order ?? "desc",
      });
      if (f?.category) params.set("categories", f.category);
      if (f?.min_price) params.set("min_price", f.min_price);
      if (f?.max_price) params.set("max_price", f.max_price);
      if (f?.stock_status) params.set("stock_status", f.stock_status);
      if (f?.on_sale) params.set("on_sale", "true");
      // Tags: WooCommerce supports filtering by tag slug via `tag`
      const tags = f?.tags ?? [];
      if (tags.length === 1) params.set("tag", tags[0]);
      return params.toString();
    },
    []
  );

  // Initial / filter-change fetch — always resets to page 1
  useEffect(() => {
    let cancelled = false;

    // Reset state before fetch
    startTransition(() => {
      setProducts([]);
      setPage(1);
      setError(null);
      setLoading(true);
    });

    const endpoint = filters.category
      ? `/api/categories/${encodeURIComponent(filters.category)}`
      : productsEndpoint;

    fetch(`${endpoint}?${buildQuery(filters, 1)}`)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.error) throw new Error(json.error);
        const initialProducts = json.data ?? [];
        setProducts(initialProducts);
        // Use the total product count returned by Store API headers.
        setTotal(json.total ?? initialProducts.length);
        setTotalPages(json.totalPages ?? 1);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? "Something went wrong.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters?.orderby,
    filters?.order,
    filters?.category,
    filters?.min_price,
    filters?.max_price,
    filters?.stock_status,
    filters?.on_sale,
    // tags serialized so array identity doesn't cause infinite loops
    (filters?.tags ?? []).join(","),
  ]);

  // Load next page (called by IntersectionObserver)
  const loadMore = useCallback(() => {
    setPage((prev) => {
      const next = prev + 1;
      if (next > totalPages) return prev;

      setLoadingMore(true);
      const endpoint = filtersRef.current.category
        ? `/api/categories/${encodeURIComponent(filtersRef.current.category)}`
        : productsEndpoint;
      fetch(`${endpoint}?${buildQuery(filtersRef.current, next)}`)
        .then((r) => r.json())
        .then((json) => {
          if (json.error) return;
          setProducts((old) => {
            // Prevent duplicate products if the observer requests a page again.
            const existingIds = new Set(old.map((product) => product.id));
            const newProducts = (json.data ?? []).filter(
              (product: WooProduct) => !existingIds.has(product.id)
            );
            return [...old, ...newProducts];
          });
          setTotal(json.total ?? 0);
          setTotalPages(json.totalPages ?? 1);
        })
        .catch(() => {})
        .finally(() => setLoadingMore(false));

      return next;
    });
  }, [totalPages, buildQuery, productsEndpoint]);

  // IntersectionObserver — triggers loadMore when sentinel enters viewport
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && !loading) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, loadingMore, loading]);

  const hasMore = page < totalPages;

  return (
    <div className="flex-1 min-w-0">
      {/* Top bar — results count */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FiGrid className="w-4 h-4 text-primary shrink-0" />
          {loading ? (
            <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
          ) : (
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-slate-200">{total.toLocaleString()}</span>
              {" "}product{total !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="col-span-3 p-6 bg-red-900/30 border border-red-800/50 rounded-2xl text-center text-sm text-red-400 mb-6">
          {error}
        </div>
      )}

      {/* Product grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(PER_PAGE)].map((_, i) => (
            <SkeletonCard key={`skeleton-init-${i}`} />
          ))}
        </div>
      ) : products.length === 0 && !error ? (
        <div className="grid grid-cols-1">
          <EmptyState />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, idx) => (
              <ProductCard key={`${product.id}-${idx}`} product={product} />
            ))}

            {/* Load-more skeleton rows */}
            {loadingMore &&
              [...Array(3)].map((_, i) => (
                <SkeletonCard key={`skeleton-more-${page}-${i}`} />
              ))}
          </div>

          {/* Sentinel for IntersectionObserver */}
          {hasMore && (
            <div ref={sentinelRef} className="h-10 mt-4" aria-hidden="true" />
          )}

          {/* End of results */}
          {!hasMore && products.length > 0 && (
            <div className="mt-10 flex flex-col items-center gap-2 text-slate-600">
              <div className="w-12 h-px bg-slate-700" />
              <p className="text-xs font-medium">All products loaded</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
