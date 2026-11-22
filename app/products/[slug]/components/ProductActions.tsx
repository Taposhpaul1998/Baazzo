"use client";

import React from "react";
import { FaBoltLightning } from "react-icons/fa6";
import { FiCheck, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";

interface Props {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  isOutOfStock: boolean;
  addedToCart: boolean;
  onAddToCart: () => void;
  onShopNow: () => void;
}

export default function ProductActions({
  qty,
  setQty,
  isOutOfStock,
  addedToCart,
  onAddToCart,
  onShopNow,
}: Props) {
  return (
    <div className="flex flex-col gap-3 pt-2 border-t border-slate-800">
      {/* Qty stepper */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider w-16 shrink-0">
          Quantity
        </span>
        <div className="flex items-center rounded-xl border border-slate-700 overflow-hidden bg-slate-800">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <FiMinus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center text-white font-semibold text-sm select-none">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart + Shop Now */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
            isOutOfStock
              ? "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700"
              : addedToCart
              ? "bg-emerald-500 text-white scale-[0.98]"
              : "bg-primary hover:bg-primary-hover text-white hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {addedToCart ? (
            <>
              <FiCheck className="w-4 h-4 shrink-0" />
              Added!
            </>
          ) : (
            <>
              <FiShoppingCart className="w-4 h-4 shrink-0" />
              Add to Cart
            </>
          )}
        </button>

        {/* Shop Now */}
        <button
          onClick={onShopNow}
          disabled={isOutOfStock}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 cursor-pointer ${
            isOutOfStock
              ? "border-slate-700 text-slate-600 cursor-not-allowed bg-slate-800"
              : "border-primary text-primary hover:bg-primary hover:text-white hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          <FaBoltLightning className="w-3.5 h-3.5 shrink-0" />
          Shop Now
        </button>
      </div>
    </div>
  );
}
