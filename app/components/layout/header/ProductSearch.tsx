"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, startTransition, useState } from "react";
import type { WooProduct } from "@/types/woocommerce";

interface Props {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function ProductSearch({ mobile = false, onNavigate }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WooProduct[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const value = query.trim();
    if (value.length < 2) {
      startTransition(() => {
        setResults([]);
        setOpen(false);
      });
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/products?search=${encodeURIComponent(value)}&per_page=6&orderby=date&order=desc`,
          { signal: controller.signal }
        );
        let json = await response.json();
        let products = json.data ?? [];

        // If the complete phrase has no result, search each meaningful word.
        // WordPress Store API supports partial word matching, which gives a
        // useful near-match experience for product names and typos.
        if (products.length === 0) {
          const words = value.split(/\s+/).filter((word) => word.length >= 3);
          const fallback = words[0];
          if (fallback && fallback.toLowerCase() !== value.toLowerCase()) {
            const fallbackResponse = await fetch(
              `/api/products?search=${encodeURIComponent(fallback)}&per_page=6&orderby=date&order=desc`,
              { signal: controller.signal }
            );
            json = await fallbackResponse.json();
            products = json.data ?? [];
          }
        }

        setResults(products);
        setOpen(true);
      } catch (error) {
        if ((error as DOMException).name !== "AbortError") setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results[0]) {
      window.location.href = `/products/${results[0].slug}`;
      onNavigate?.();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${mobile ? "w-full" : "flex-1 max-w-2xl"}`}>
      <form onSubmit={submit} className="flex items-center border-2 border-slate-200 focus-within:border-primary rounded-lg overflow-hidden bg-white shadow-sm transition-colors">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => query.trim().length >= 2 && setOpen(true)}
          placeholder={mobile ? "Search fitness equipment, sports…" : "Search fitness gear, treadmills, sports items…"}
          aria-label="Search products"
          className="flex-1 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
        />
        {!mobile && <button type="submit" className="bg-primary hover:bg-primary-hover px-6 py-2.5 text-white font-medium">Search</button>}
      </form>

      {open && (
        <div className="absolute top-full left-0 right-0 z-[60] mt-2 overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl">
          <div className="max-h-96 overflow-y-auto">
            {loading ? <p className="px-4 py-5 text-sm text-slate-400">Searching products…</p> : results.length === 0 ? <p className="px-4 py-5 text-sm text-slate-400">No products found</p> : results.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} onClick={onNavigate} className="flex items-center gap-3 border-b border-slate-800 p-3 last:border-0 hover:bg-slate-800 transition-colors">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                  {product.images[0] && <Image src={product.images[0].src} alt={product.images[0].alt || product.name} fill sizes="48px" className="object-cover" />}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-100">{product.name}</p>
                  <p className="text-sm font-bold text-primary">৳{Number(product.price || 0).toLocaleString("en-BD")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
