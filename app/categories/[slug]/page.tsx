import ShopClient from "@/app/shop/components/ShopClient";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = decodeURIComponent(slug).replace(/-/g, " ");
  return {
    title: `${name} – Baazzo`,
    description: `Shop ${name} products at Baazzo.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categoryName = decodeURIComponent(slug).replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-primary font-medium capitalize">{categoryName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading capitalize">
            {categoryName}
          </h1>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShopClient
          initialCategory={slug}
          productsEndpoint={`/api/categories/${encodeURIComponent(slug)}`}
          initialOrderby="date"
          initialOrder="desc"
        />
      </div>
    </main>
  );
}
