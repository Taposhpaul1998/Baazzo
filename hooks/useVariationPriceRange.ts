/**
 * useVariationPriceRange
 *
 * Variable product-এর price range client-side-এ fetch করার hook।
 *
 * - Simple product হলে নিজে থেকেই skip করে।
 * - WooCommerce credentials কখনো browser-এ যায় না (Next.js API route মাধ্যমে)।
 * - Abort controller দিয়ে memory leak থেকে সুরক্ষিত।
 * - SWR-style: একই slug-এর জন্য একাধিক কার্ড থাকলে শুধু একবার fetch হয়।
 *
 * Usage:
 *   const { priceRange, isLoading, isError } = useVariationPriceRange(product);
 */

"use client";

import { useEffect, useRef, useState } from "react";
import type { WooProduct } from "@/types/woocommerce";

export interface VariationPriceRange {
  type: "simple" | "variable";
  min: number | null;
  max: number | null;
  formatted: string;
}

interface HookReturn {
  priceRange: VariationPriceRange | null;
  isLoading: boolean;
  isError: boolean;
}

// ── Module-level in-memory cache (per browser session) ──────────────────────
// একই slug-এর জন্য duplicate requests এড়ায়।
const cache = new Map<string, VariationPriceRange>();

export function useVariationPriceRange(product: WooProduct): HookReturn {
  const isVariable = product.type === "variable" && product.variations?.length > 0;

  // Initial state: cache থেকে নাও, না থাকলে null
  const cached = cache.get(product.slug) ?? null;

  const [priceRange, setPriceRange] = useState<VariationPriceRange | null>(cached);
  // Loading: variable product এবং cache নেই → true, অন্যথায় false
  const [isLoading, setIsLoading] = useState<boolean>(
    isVariable && cached === null
  );
  const [isError, setIsError] = useState<boolean>(false);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Simple product বা আগে থেকে cache-এ থাকলে skip
    if (!isVariable || cache.has(product.slug)) {
      return;
    }

    // পুরনো request cancel করো
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    fetch(`/api/products/${product.slug}/variation-prices`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json() as Promise<VariationPriceRange>;
      })
      .then((data) => {
        cache.set(product.slug, data);
        setPriceRange(data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("[useVariationPriceRange]", err);
        setIsError(true);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [product.slug, isVariable]);

  return { priceRange, isLoading, isError };
}
