"use client";

import { decodeHtmlEntities } from "@/lib/formatters";
import type { WooProduct } from "@/types/woocommerce";
import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiStar } from "react-icons/fi";
import ProductActions from "./ProductActions";
import ProductAttributes from "./ProductAttributes";

interface Props {
  product: WooProduct;
  priceFormatted?: string;
}

export default function ProductInfo({ product, priceFormatted }: Props) {
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [highlightAttributes, setHighlightAttributes] = useState(false);
  const [selectedVariationPrice, setSelectedVariationPrice] = useState<string | null>(null);

  const activePrice = selectedVariationPrice ?? (priceFormatted
    ? priceFormatted
    : product.price
    ? `৳${parseFloat(product.price).toLocaleString("en-BD")}`
    : "Price on request");

  const isOutOfStock = product.stock_status === "outofstock";

  const hasDiscount =
    product.on_sale &&
    product.regular_price &&
    product.sale_price &&
    parseFloat(product.regular_price) > parseFloat(product.sale_price);

  const discountPct = hasDiscount
    ? Math.round(
        ((parseFloat(product.regular_price) - parseFloat(product.sale_price)) /
          parseFloat(product.regular_price)) *
          100
      )
    : 0;

  const hasVariations = product.type === "variable" || (product.variations && product.variations.length > 0);
  const validAttributes = product.attributes?.filter((attr) => attr.options?.length > 0) ?? [];

  function validateSelection(action: "adding to cart" | "proceeding") {
    if (!hasVariations && validAttributes.length === 0) return true;

    const missingAttributes = validAttributes.filter((attr) => !selectedSizes[attr.name]);
    const hasSelectedVariation = Boolean(selectedSizes.Id);

    if (!hasSelectedVariation || missingAttributes.length > 0) {
      setErrorMessage(`Please select a size before ${action}.`);
      setHighlightAttributes(true);
      window.setTimeout(() => setHighlightAttributes(false), 2500);
      return false;
    }

    return true;
  }

  function handleAddToCart() {
    if (isOutOfStock || !validateSelection("adding to cart")) return;

    setErrorMessage(null);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }

  function handleShopNow() {
    if (isOutOfStock || !validateSelection("proceeding")) return;

    setErrorMessage(null);
    // TODO: Proceed to checkout with selected options
  }

  const ratingNum = parseFloat(product.average_rating) || 0;
  const ratingFilled = Math.round(ratingNum);

  return (
    <div className="flex flex-col gap-5">
      {/* ── Category tags ── */}
      {product.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* ── Title ── */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading leading-snug">
        {decodeHtmlEntities(product.name)}
      </h1>

      {/* ── Short description ── */}
      {product.short_description && (
        <div
          className="text-sm text-slate-400 leading-relaxed prose prose-invert prose-sm max-w-none
            [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1
            [&_strong]:text-slate-300 [&_p]:mb-2"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />
      )}

      {/* ── Rating ── */}
      {product.rating_count > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`w-4 h-4 ${
                  star <= ratingFilled
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-400">
            {product.average_rating}{" "}
            <span className="text-slate-600">
              ({product.rating_count} review{product.rating_count !== 1 ? "s" : ""})
            </span>
          </span>
        </div>
      )}

      {/* ── Price ── */}
      <div className="flex items-end gap-3 flex-wrap pt-1">
        <span className="text-3xl font-extrabold text-primary">{activePrice}</span>
        {hasDiscount && (
          <>
            {!product?.price_range && product?.regular_price && (
              <span className="text-lg text-slate-500 line-through mb-0.5">
                ৳{parseFloat(product.regular_price).toLocaleString("en-BD")}
              </span>
            )}
            <span className="text-sm font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
              -{discountPct}% OFF
            </span>
          </>
        )}
      </div>

      {/* ── Stock + SKU ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${
            isOutOfStock
              ? "bg-red-500/10 text-red-400"
              : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          <FiCheck className="w-3.5 h-3.5" />
          {isOutOfStock ? "Out of Stock" : "In Stock"}
        </span>
        {product.sku && (
          <span className="text-xs text-slate-600">SKU: {product.sku}</span>
        )}
      </div>

      {/* ── Error message for unselected size ── */}
      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-2.5 rounded-xl animate-shake">
          {errorMessage}
        </div>
      )}

      {/* ── Attributes / Variations ── */}
      <div
        className={`transition-all duration-300 rounded-2xl ${
          highlightAttributes
            ? "p-2 bg-red-500/5"
            : ""
        }`}
      >
        <ProductAttributes
          attributes={product.attributes ?? []}
          variations={product.variations ?? []}
          selectedSizes={selectedSizes}
          setSelectedSizes={(update) => {
            setSelectedSizes(update);
            setErrorMessage(null);
          }}
          highlight={highlightAttributes}
          onPriceChange={setSelectedVariationPrice}
        />
      </div>

      {/* ── Quantity + Actions ── */}
      <ProductActions
        qty={qty}
        setQty={setQty}
        isOutOfStock={isOutOfStock}
        addedToCart={addedToCart}
        onAddToCart={handleAddToCart}
        onShopNow={handleShopNow}
      />
    </div>
  );
}
