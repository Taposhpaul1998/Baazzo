"use client";

import { useCallback, useEffect, startTransition, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import ShopFilters, { type ShopFilterState } from "./ShopFilters";
import ShopProductGrid from "./ShopProductGrid";

const DEFAULT_FILTERS: ShopFilterState = {
  orderby: "date",
  order: "desc",
  min_price: "",
  max_price: "",
  category: "",
  tags: [],
  on_sale: false,
  stock_status: "",
};

interface Props {
  initialCategory?: string;
  initialOrderby?: string;
  initialOrder?: string;
  productsEndpoint?: string;
}

export default function ShopClient({
  initialCategory = "",
  initialOrderby = "date",
  initialOrder = "desc",
  productsEndpoint = "/api/products",
}: Props) {
  const [filters, setFilters] = useState<ShopFilterState>({
    ...DEFAULT_FILTERS,
    category: initialCategory,
    orderby: initialOrderby,
    order: initialOrder,
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFilterChange = useCallback((next: Partial<ShopFilterState>) => {
    setFilters((prev) => ({ ...prev, ...next }));
  }, []);

  const handleReset = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTERS,
      category: initialCategory,
      orderby: initialOrderby,
      order: initialOrder,
    });
  }, [initialCategory, initialOrderby, initialOrder]);

  // Keep filters.category synchronized when initialCategory prop changes (e.g. navigation between category pages)
  useEffect(() => {
    startTransition(() => {
      setFilters((prev) => ({
        ...prev,
        category: initialCategory,
      }));
    });
  }, [initialCategory]);

  // Listen for reset events dispatched from EmptyState button inside grid
  useEffect(() => {
    const handler = () => handleReset();
    window.addEventListener("shop:reset-filters", handler);
    return () => window.removeEventListener("shop:reset-filters", handler);
  }, [handleReset]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFilterOpen]);

  return (
    <div className="flex gap-6 items-start">
      {/* Filter sidebar */}
      <ShopFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
        mobileOpen={mobileFilterOpen}
        onMobileClose={() => setMobileFilterOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile filter toggle bar */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-semibold text-slate-300 hover:border-primary hover:text-primary transition-all shadow-sm"
          >
            <HiOutlineAdjustmentsHorizontal className="w-5 h-5" />
            Filters &amp; Sort
          </button>
        </div>

        {/* Product grid with infinite scroll */}
        <ShopProductGrid filters={filters} productsEndpoint={productsEndpoint} />
      </div>
    </div>
  );
}
