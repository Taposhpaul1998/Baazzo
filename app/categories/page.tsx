/**
 * /categories — All Product Categories
 *
 * Displays all product categories available on Baazzo.
 * Clicking any category takes the user to /categories/[slug] which loads that category's products.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiGrid, FiPackage, FiArrowRight } from "react-icons/fi";
import { TbTreadmill } from "react-icons/tb";
import { FaBicycle, FaDumbbell, FaFutbol, FaChair, FaTableTennisPaddleBall } from "react-icons/fa6";
import type { WooCategory } from "@/types/woocommerce";

export const metadata: Metadata = {
  title: "Categories – Baazzo",
  description: "Browse all product categories at Baazzo. Find treadmills, exercise bikes, gym equipment, sports, and more.",
  openGraph: {
    title: "Categories – Baazzo",
    description: "Browse all product categories at Baazzo.",
  },
};

// Helper to get matching icon for well-known categories
function getCategoryIcon(slug: string) {
  switch (slug) {
    case "treadmill":
    case "walking-pad":
    case "manual-treadmill":
    case "motorized-treadmill":
    case "dc-motor-treadmill":
    case "ac-motor-treadmill":
      return TbTreadmill;
    case "exercise-bike":
    case "cross-trainer":
    case "spinning-bike":
    case "recumbent-bike":
      return FaBicycle;
    case "gym-equipment":
    case "home-gym":
    case "exercise-bench":
    case "dumbbells":
    case "small-fitness":
      return FaDumbbell;
    case "sports":
    case "football-jersey":
    case "indoor-sports":
    case "outdoor-sports":
      return FaFutbol;
    case "massage-chair":
      return FaChair;
    case "table-tennis":
      return FaTableTennisPaddleBall;
    default:
      return FiGrid;
  }
}

async function fetchCategories(): Promise<WooCategory[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/categories?per_page=100&hide_empty=true`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) throw new Error("Failed to fetch categories");
    const json = await res.json();
    return json.data ?? [];
  } catch (err) {
    console.error("[CategoriesPage] Error fetching categories:", err);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Page Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary font-medium">Categories</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white font-heading tracking-tight">
            Product Categories
          </h1>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
            Explore our curated collections of fitness equipment, sports gear, wellness products, and accessories.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {categories.length === 0 ? (
          <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
            <FiPackage className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">No categories found</h2>
            <p className="text-sm text-slate-400 mb-6">Please check back later or explore our shop.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat.slug);
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group relative bg-slate-900 border border-slate-800 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Icon / Image container */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center mb-5 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
                    {cat.image?.src ? (
                      <Image
                        src={cat.image.src}
                        alt={cat.name}
                        fill
                        className="object-cover rounded-2xl p-1"
                        sizes="(max-width: 768px) 80px, 96px"
                      />
                    ) : (
                      <Icon className="w-9 h-9 sm:w-10 sm:h-10 text-primary transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="relative text-base sm:text-lg font-bold text-white font-heading mb-1 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h2>

                  {/* Product count */}
                  <span className="relative text-xs sm:text-sm text-slate-400 mb-4">
                    {cat.count} {cat.count === 1 ? "Product" : "Products"}
                  </span>

                  {/* View Products Link Action */}
                  <span className="relative inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary mt-auto group-hover:translate-x-1 transition-transform">
                    View Products
                    <FiArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
