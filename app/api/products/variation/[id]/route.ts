import { wooStoreFetch } from "@/lib/woocommerce";
import type { WooStoreProduct } from "@/types/woocommerce";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid variation ID." }, { status: 400 });
  }

  try {
    const variation = await wooStoreFetch<WooStoreProduct>(`/products/${id}`, {
      next: { revalidate: 600 },
    });

    return NextResponse.json(
      {
        data: {
          id: variation.id,
          price: variation.prices?.price ?? variation.price ?? "",
          regularPrice:
            variation.prices?.regular_price ?? variation.regular_price ?? "",
          salePrice: variation.prices?.sale_price ?? variation.sale_price ?? "",
          onSale: variation.is_on_sale ?? variation.on_sale ?? false,
          stockStatus: variation.is_in_stock === false ? "outofstock" : "instock",
        },
      },
      { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120" } }
    );
  } catch (error) {
    console.error("[/api/products/variation/[id]]", error);
    return NextResponse.json(
      { error: "Failed to fetch variation price." },
      { status: 502 }
    );
  }
}
