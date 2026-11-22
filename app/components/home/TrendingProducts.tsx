import type { WooProduct } from "@/types/woocommerce";
import Link from "next/link";
import { FaArrowRight, FaFire } from "react-icons/fa6";
import ProductCard from "./ProductCard";

async function getTrendingProducts(): Promise<WooProduct[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products/trending`, {
      next: { revalidate: 600 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function TrendingProducts() {
  const products = await getTrendingProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">

      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-2">
          <FaFire className="w-5 h-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-heading font-bold text-white leading-tight">
            Trending Now
          </h2>
        </div>

        <Link
          href="/shop?orderby=popularity"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors duration-200 group"
        >
          <span>View All</span>
          <FaArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-100 rounded-2xl aspect-square animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
