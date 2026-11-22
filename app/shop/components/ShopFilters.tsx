"use client";

import Link from "next/link";
import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export interface ShopFilterState {
  orderby: string;
  order: string;
  min_price: string;
  max_price: string;
  category: string;
  tags: string[];
  on_sale: boolean;
  stock_status: string;
}

interface WooCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface WooTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface Props {
  filters: ShopFilterState;
  onChange: (next: Partial<ShopFilterState>) => void;
  onReset: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const SORT_OPTIONS = [
  { label: "Newest First",        orderby: "date",       order: "desc" },
  { label: "Oldest First",        orderby: "date",       order: "asc"  },
  { label: "Price: Low → High",   orderby: "price",      order: "asc"  },
  { label: "Price: High → Low",   orderby: "price",      order: "desc" },
  { label: "Popularity",          orderby: "popularity", order: "desc" },
  { label: "Top Rated",           orderby: "rating",     order: "desc" },
  { label: "Name: A → Z",         orderby: "title",      order: "asc"  },
  { label: "Name: Z → A",         orderby: "title",      order: "desc" },
];

const PRICE_PRESETS = [
  { label: "Under ৳500",         min: "",     max: "500"  },
  { label: "৳500 – ৳1,000",     min: "500",  max: "1000" },
  { label: "৳1,000 – ৳2,500",   min: "1000", max: "2500" },
  { label: "৳2,500 – ৳5,000",   min: "2500", max: "5000" },
  { label: "Over ৳5,000",        min: "5000", max: ""     },
];

function AccordionSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-700/60 last:border-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between py-3.5 text-sm font-semibold text-slate-300 hover:text-primary transition-colors"
      >
        {title}
        {open ? (
          <FiChevronUp className="w-4 h-4 shrink-0" />
        ) : (
          <FiChevronDown className="w-4 h-4 shrink-0" />
        )}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export default function ShopFilters({
  filters,
  onChange,
  onReset,
  mobileOpen,
  onMobileClose,
}: Props) {
  const [categories, setCategories] = useState<WooCategory[]>([]);
  const [tags, setTags]             = useState<WooTag[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [tagLoading, setTagLoading] = useState(true);

  const [customMin, setCustomMin] = useState(filters.min_price);
  const [customMax, setCustomMax] = useState(filters.max_price);
  const priceDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/categories?hide_empty=true&per_page=100&orderby=name&order=asc")
      .then((r) => r.json())
      .then((json) => setCategories(json.data ?? []))
      .catch(() => setCategories([]))
      .finally(() => setCatLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/products/tags?hide_empty=true&per_page=50")
      .then((r) => r.json())
      .then((json) => setTags(json.data ?? []))
      .catch(() => setTags([]))
      .finally(() => setTagLoading(false));
  }, []);

  useEffect(() => {
    startTransition(() => {
      setCustomMin(filters.min_price);
      setCustomMax(filters.max_price);
    });
  }, [filters.min_price, filters.max_price]);

  console.log(categories)

  const handlePriceInput = useCallback(
    (field: "min_price" | "max_price", value: string) => {
      const sanitized = value.replace(/[^\d]/g, "");
      if (field === "min_price") setCustomMin(sanitized);
      else setCustomMax(sanitized);

      if (priceDebounceRef.current) clearTimeout(priceDebounceRef.current);
      priceDebounceRef.current = setTimeout(() => {
        onChange({ [field]: sanitized });
      }, 500);
    },
    [onChange]
  );

  const handlePricePreset = (min: string, max: string) =>
    onChange({ min_price: min, max_price: max });

  const handleTagToggle = (slug: string) => {
    const currentTags = filters?.tags ?? [];
    const next = currentTags.includes(slug)
      ? currentTags.filter((t) => t !== slug)
      : [...currentTags, slug];
    onChange({ tags: next });
  };

  const activeFiltersCount = [
    (filters?.orderby ?? "date") !== "date" || (filters?.order ?? "desc") !== "desc",
    filters?.min_price || filters?.max_price,
    filters?.category,
    (filters?.tags ?? []).length > 0,
    filters?.on_sale,
    filters?.stock_status,
  ].filter(Boolean).length;

  const currentSort = SORT_OPTIONS.find(
    (o) => o.orderby === (filters?.orderby ?? "date") && o.order === (filters?.order ?? "desc")
  );

  /* ─── shared sidebar markup ─────────────────────────────────── */
  const sidebar = (
    <div className="flex flex-col h-full bg-slate-900">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/60">
        <div className="flex items-center gap-2">
          <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-primary" />
          <span className="font-bold text-slate-100 text-sm">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMobileClose}
            className="lg:hidden w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-2 scrollbar-hide">

        {/* ── Sort ── */}
        <AccordionSection title="Sort By" defaultOpen={true}>
          <div className="flex flex-col gap-0.5">
            {SORT_OPTIONS.map((opt) => {
              const active = filters.orderby === opt.orderby && filters.order === opt.order;
              return (
                <button
                  key={`${opt.orderby}-${opt.order}`}
                  onClick={() => onChange({ orderby: opt.orderby, order: opt.order })}
                  className={`text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 ${
                    active
                      ? "bg-primary/15 text-primary font-semibold"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </AccordionSection>

        {/* ── Price ── */}
        <AccordionSection title="Price Range" defaultOpen={true}>
          <div className="flex flex-col gap-0.5 mb-3">
            {PRICE_PRESETS.map((p) => {
              const active = filters.min_price === p.min && filters.max_price === p.max;
              return (
                <button
                  key={p.label}
                  onClick={() => handlePricePreset(p.min, p.max)}
                  className={`text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 ${
                    active
                      ? "bg-primary/15 text-primary font-semibold"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Custom range */}
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
            <p className="text-xs font-medium text-slate-500 mb-2">Custom Range</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">৳</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Min"
                  value={customMin}
                  onChange={(e) => handlePriceInput("min_price", e.target.value)}
                  className="w-full pl-6 pr-2 py-2 text-sm text-slate-200 placeholder-slate-600 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <span className="text-slate-600 text-sm font-medium">—</span>
              <div className="flex-1 relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">৳</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Max"
                  value={customMax}
                  onChange={(e) => handlePriceInput("max_price", e.target.value)}
                  className="w-full pl-6 pr-2 py-2 text-sm text-slate-200 placeholder-slate-600 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* ── Categories ── */}
        <AccordionSection title="Categories" defaultOpen={true}>
          {catLoading ? (
            <div className="flex flex-col gap-1.5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 rounded-lg bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-2">No categories found</p>
          ) : (
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => onChange({ category: "" })}
                className={`text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 flex items-center justify-between ${
                  !filters.category
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <span>All Categories</span>
              </button>
              {categories.map((cat) => {
               const isActive = filters.category === cat.slug;

                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className={`text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 flex items-center justify-between ${
                      isActive
                        ? "bg-primary/15 text-primary font-semibold"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span
                      className={`text-xs shrink-0 ml-1 ${
                        isActive ? "text-primary" : "text-slate-600"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </AccordionSection>

        {/* ── Tags ── */}
        <AccordionSection title="Tags" defaultOpen={false}>
          {tagLoading ? (
            <div className="flex flex-wrap gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-7 w-16 rounded-full bg-slate-800 animate-pulse" />
              ))}
            </div>
          ) : tags.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-2">No tags found</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const active = (filters?.tags ?? []).includes(tag.slug);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.slug)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-150 ${
                      active
                        ? "bg-primary text-white border-primary font-semibold"
                        : "bg-slate-800 text-slate-400 border-slate-700 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          )}
        </AccordionSection>

        {/* ── Availability ── */}
        <AccordionSection title="Availability" defaultOpen={false}>
          <div className="flex flex-col gap-0.5">
            {[
              { label: "All Products",  value: ""          },
              { label: "In Stock",      value: "instock"   },
              { label: "Out of Stock",  value: "outofstock"},
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => onChange({ stock_status: opt.value })}
                className={`text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 ${
                  filters.stock_status === opt.value
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </AccordionSection>

        {/* ── On Sale toggle ── */}
        <div className="py-3.5 border-b border-slate-700/60">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm font-semibold text-slate-300 group-hover:text-primary transition-colors">
              On Sale Only
            </span>
            <div
              onClick={() => onChange({ on_sale: !filters.on_sale })}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                filters.on_sale ? "bg-primary" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  filters.on_sale ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* Footer summary */}
      {currentSort && (
        <div className="px-5 py-3 border-t border-slate-700/60 bg-slate-950/40">
          <p className="text-xs text-slate-500 truncate">
            Sorted by:{" "}
            <span className="font-medium text-slate-300">{currentSort.label}</span>
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 sticky top-20 self-start rounded-2xl border border-slate-800 shadow-lg overflow-hidden"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onMobileClose}
        />
        <div
          className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] shadow-2xl flex flex-col transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebar}
        </div>
      </div>
    </>
  );
}
