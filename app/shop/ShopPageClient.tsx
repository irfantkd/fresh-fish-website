"use client";

import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import { GridSkeleton } from "@/components/ui/GridSkeleton";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { useGetQuery } from "@/store/apiSlice";
import { filterAndSortProducts } from "@/lib/utils/filterProducts";
import type { Category, Product } from "@/types";

interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export function ShopPageClient() {
  const searchParams = useSearchParams();
  const { data: productsData, isLoading: isLoadingProducts } = useGetQuery({
    path: "/products",
    params: { status: "published" },
  });
  const { data: categoriesData } = useGetQuery({ path: "/categories" });

  const allProducts = (productsData as ProductsResponse | undefined)?.items ?? [];
  const categories = (categoriesData as Category[] | undefined) ?? [];

  const products = filterAndSortProducts(allProducts, {
    filter: searchParams.get("filter") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
  });

  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: "Shop", url: "/shop" }]} />
        <SectionHeading
          eyebrow="Our Shop"
          title="Every Fresh Catch, One Place"
          description="Filter by category, freshness, or price to find exactly what you need for tonight's dinner."
          className="mt-6"
        />

        <div className="mt-8">
          <ShopFilters categories={categories} />
        </div>

        <div className="mt-10">
          {isLoadingProducts ? <GridSkeleton count={8} /> : <ProductGrid products={products} />}
        </div>
      </Container>
    </div>
  );
}
