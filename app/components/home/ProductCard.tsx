"use client";

import type { WooProduct } from "@/types/woocommerce";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

interface Props {
  product: WooProduct;
}

export default function ProductCard({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const image = product.images?.[0];
  const hasDiscount = product.on_sale && product.regular_price && product.sale_price;
  const detailsUrl = `/products/${product.slug}`;

  const discountPercent =
    hasDiscount
      ? Math.round(
          ((parseFloat(product.regular_price) - parseFloat(product.sale_price)) /
            parseFloat(product.regular_price)) *
            100
        )
      : 0;

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    setIsFavorite((prev) => !prev);
    // TODO: connect to wishlist context/API
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    // TODO: connect to cart context/API
  }

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-black/8 transition-all duration-300 hover:-translate-y-1 overflow-hidden">

      {/* ── Image ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-50 aspect-square">
        <Link href={detailsUrl} aria-label={`View ${product.name}`}>
          {image ? (
            <Image
              src={image.src}
              alt={image.alt || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <span className="text-slate-400 text-sm">No Image</span>
            </div>
          )}
        </Link>

        {/* Sale badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            -{discountPercent}%
          </span>
        )}

        {/* Stock badge */}
        {product.stock_status === "outofstock" && (
          <span className="absolute top-3 left-3 bg-slate-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
            Out of Stock
          </span>
        )}

        {/* Hover action icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          {/* Eye — view details */}
          <Link
            href={detailsUrl}
            aria-label="View product details"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md text-slate-600 hover:bg-primary hover:text-white transition-all duration-200"
          >
            <FaEye className="w-4 h-4" />
          </Link>

          {/* Favorite */}
          <button
            onClick={handleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className={`w-9 h-9 flex items-center justify-center rounded-full shadow-md transition-all duration-200 ${
              isFavorite
                ? "bg-primary text-white"
                : "bg-white text-slate-600 hover:bg-primary hover:text-white"
            }`}
          >
            <FaHeart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Info ────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-3 pt-2.5 pb-0 gap-1.5">

        {/* Title — max 2 lines, rest truncated with … */}
        <Link href={detailsUrl} className="group/title">
          <h3 className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2 group-hover/title:text-primary transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {hasDiscount ? (
            <>
              <span className="text-sm font-bold text-primary">
                ৳{parseFloat(product.sale_price).toLocaleString("en-BD")}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ৳{parseFloat(product.regular_price).toLocaleString("en-BD")}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-primary">
              {product.price
                ? `৳${parseFloat(product.price).toLocaleString("en-BD")}`
                : "Price on request"}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center border-t border-slate-100 mb-1">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock_status === "outofstock"}
            aria-label="Add to cart"
            className={`flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-2 transition-colors duration-200 cursor-pointer ${
              product.stock_status === "outofstock"
                ? "text-slate-300 cursor-not-allowed"
                : addedToCart
                ? "text-green-500"
                : "text-slate-500 hover:text-primary"
            }`}
          >
            <FaShoppingCart className="w-3 h-3 shrink-0" />
            <span>{addedToCart ? "Added!" : "Add to Cart"}</span>
          </button>

          {/* Divider */}
          <div className="w-px h-4 bg-slate-200 shrink-0" />

          {/* Shop Now */}
          <Link
            href={detailsUrl}
            aria-label="Shop now"
            className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-2 text-slate-500 hover:text-primary transition-colors duration-200"
          >
            <FaArrowRight className="w-3 h-3" />
            <span>Shop Now</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
