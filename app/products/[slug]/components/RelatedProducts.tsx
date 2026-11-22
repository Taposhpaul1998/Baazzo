import { wooStoreFetch, mapStoreProductToWooProduct } from "@/lib/woocommerce";
import type { WooProduct, WooStoreProduct } from "@/types/woocommerce";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import ProductCard from "@/app/components/home/ProductCard";

interface Props {
  categoryId: number;
  excludeId: number;
}

async function getRelated(categoryId: number, excludeId: number): Promise<WooProduct[]> {
  try {
    const storeProducts = await wooStoreFetch<WooStoreProduct[]>(
      `/products?category=${categoryId}&status=publish&per_page=6`,
      { next: { revalidate: 300 } }
    );
    const products = (storeProducts ?? []).map(mapStoreProductToWooProduct);
    return products.filter((p) => p.id !== excludeId).slice(0, 4);
  } catch {
    return [];
  }
}

export default async function RelatedProducts({ categoryId, excludeId }: Props) {
  const products = await getRelated(categoryId, excludeId);
  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg sm:text-xl font-bold text-white font-heading">
          Related Products
        </h2>
        <Link
          href="/shop"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors group"
        >
          View All
          <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
