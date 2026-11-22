import type { Metadata } from "next";
import Link from "next/link";
import ShopClient from "./components/ShopClient";

export const metadata: Metadata = {
  title: "Shop — Baazzo",
  description:
    "Browse our full collection of products. Filter by category, price, tags and more.",
  openGraph: {
    title: "Shop — Baazzo",
    description: "Browse our full collection of products.",
  },
};

interface Props {
  searchParams: Promise<{ category?: string; orderby?: string; order?: string }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category ?? "";
  const orderby = params.orderby ?? "date";
  const order = params.order ?? "desc";

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Page header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary font-medium">Shop</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            All Products
          </h1>
          <p className="mt-1 text-slate-400 text-sm">
            Discover our complete collection
          </p>
        </div>
      </div>

      {/* Shop layout */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShopClient
          initialCategory={category}
          initialOrderby={orderby}
          initialOrder={order}
        />
      </div>
    </main>
  );
}
