"use client";

import type { WooVariation } from "@/types/woocommerce";
import React, { useState } from "react";

interface Props {
  attributes?: unknown[];
  variations: Array<WooVariation | number>;
  selectedSizes: Record<string, string>;
  setSelectedSizes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  highlight?: boolean;
  onPriceChange?: (price: string | null) => void;
}

export default function ProductAttributes({
  variations,
  selectedSizes,
  setSelectedSizes,
  highlight = false,
  onPriceChange,
}: Props) {
  const [variationPrice, setVariationPrice] = useState<string | null>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  const sizeVariations = variations
    ?.filter((item): item is WooVariation => typeof item !== "number")
    .map((item) => ({
      id: item.id,
      value: item.attributes?.[0]?.value || "",
    })) ?? [];

  if (sizeVariations.length === 0) return null;

  function formatSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/(\d)-(\d)/g, '$1.$2')  // 12-5 → 12.5
    .replace(/-/g, ' ');             // baki hyphen → space
}

  return (
    <div className={`flex flex-col gap-2 pt-5 border-t border-slate-800 transition-all duration-300 ${highlight ? "ring-1 ring-red-500 p-3 bg-red-500/5 rounded-lg" : ""}`}>
      <span className={`text-sm font-semibold ${highlight ? "text-red-400" : "text-slate-400"}`}>Select Size</span>
      <div className="flex flex-wrap gap-2">
        {sizeVariations.map((variation) => (
          <button
            key={variation.id}
            className={`px-3 py-1 text-sm font-medium rounded-md border cursor-pointer ${
              selectedSizes["Size"] === variation.value
                ? "bg-primary text-white border-primary"
                : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-primary hover:text-white"
            }`}
            onClick={async () => {
              const variationId = variation.id.toString();
              setSelectedSizes((prev) => ({
                ...prev,
                Id: variationId,
                Size: variation.value,
              }));
              setIsLoadingPrice(true);
              setVariationPrice(null);

              try {
                const response = await fetch(`/api/products/variation/${variationId}`);
                if (!response.ok) throw new Error("Price request failed");
                const result = await response.json();
                const amount = Number(result.data?.price);
                const formatted = Number.isFinite(amount)
                  ? `৳${amount.toLocaleString("en-BD")}`
                  : null;
                setVariationPrice(formatted);
                onPriceChange?.(formatted);
              } catch {
                setVariationPrice(null);
                onPriceChange?.(null);
              } finally {
                setIsLoadingPrice(false);
              }
            }}
          >
            {decodeURIComponent(formatSlug(variation.value))}
          </button>
        ))}
      </div>
      {isLoadingPrice && (
        <span className="text-sm text-slate-400">Loading price...</span>
      )}
      {!isLoadingPrice && variationPrice && (
        <span className="text-xl font-bold text-primary">{variationPrice}</span>
      )}
    </div>
  );
}

