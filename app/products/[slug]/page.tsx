import { wooStoreFetch, mapStoreProductToWooProduct } from "@/lib/woocommerce";
import { decodeHtmlEntities } from "@/lib/formatters";
import type { WooProduct, WooStoreProduct } from "@/types/woocommerce";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";

interface Props {
  params: Promise<{ slug: string }>;
}

// ── Server-side product fetch ────────────────────────────────────
async function getProduct(slug: string): Promise<WooProduct | null> {
  try {
    const storeProducts = await wooStoreFetch<WooStoreProduct[]>(
      `/products?slug=${encodeURIComponent(slug)}&status=publish`,
      { next: { revalidate: 600 } }
    );
    const storeProduct = storeProducts?.[0];
    return storeProduct ? mapStoreProductToWooProduct(storeProduct) : null;
  } catch {
    return null;
  }
}

// ── Variable product price range ────────────────────────────────
async function getVariationPrice(slug: string): Promise<string | undefined> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products/${slug}/variation-prices`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return undefined;
    const json = await res.json();
    return json.formatted as string;
  } catch {
    return undefined;
  }
}

// ── Dynamic metadata ────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found — Baazzo" };

  const decodedName = decodeHtmlEntities(product.name);
  const image = product.images?.[0]?.src;

  return {
    title: `${decodedName} — Baazzo`,
    description: product.short_description
      ? product.short_description.replace(/<[^>]+>/g, "").slice(0, 160)
      : `Buy ${decodedName} at the best price from Baazzo.`,
    openGraph: {
      title: decodedName,
      description: product.short_description?.replace(/<[^>]+>/g, "").slice(0, 160),
      images: image ? [{ url: image }] : [],
    },
  };
}

// ── Page ────────────────────────────────────────────────────────
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  if (!slug || typeof slug !== "string" || slug.length > 255 || /[/\\]/.test(slug) || slug.includes("..")) notFound();

  const product = await getProduct(slug);
  if (!product) notFound();

  const priceFormatted =
    product.type === "variable"
      ? await getVariationPrice(slug)
      : undefined;

  const firstCat = product.categories?.[0];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ── Breadcrumb ── */}
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <FiChevronRight className="w-3 h-3 shrink-0" />
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            {firstCat && (
              <>
                <FiChevronRight className="w-3 h-3 shrink-0" />
                <Link
                  href={`/shop?category=${firstCat.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {firstCat.name}
                </Link>
              </>
            )}
            <FiChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-primary font-medium line-clamp-1 max-w-[200px]">
              {decodeHtmlEntities(product.name)}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ── Main: Gallery + Info ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images ?? []} productName={product.name} />
          <ProductInfo product={product} priceFormatted={priceFormatted} />
        </div>

        {/* ── Tabs: Description / Reviews ── */}
        <ProductTabs
          description={product.description}
          attributes={product.attributes ?? []}
          sku={product.sku}
          productId={product.id}
          averageRating={product.average_rating}
          ratingCount={product.rating_count}
        />

        {/* ── Related products ── */}
        {firstCat && (
          <RelatedProducts categoryId={firstCat.id} excludeId={product.id} />
        )}
      </div>
    </main>
  );
}
