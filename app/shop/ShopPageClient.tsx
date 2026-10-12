"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { filterAndSortProducts } from "@/lib/utils/filterProducts";
import type { Category, Product } from "@/types";

export function ShopPageClient({
  allProducts,
  categories,
}: {
  allProducts: Product[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();

  const activeCategorySlug = searchParams.get("category") ?? undefined;
  const filterParam = searchParams.get("filter") ?? undefined;
  const sortParam = searchParams.get("sort") ?? undefined;

  // Re-filtering/sorting the full catalog on every render (e.g. unrelated
  // parent re-renders) would be wasted work — only recompute when the data
  // or the URL params driving the filter actually change.
  const products = useMemo(() => {
    // A parent category's filter pill should match its own products plus
    // its subcategories' — same aggregation the category detail page does.
    const activeCategory = categories.find((c) => c.slug === activeCategorySlug);
    const categorySlugs = activeCategory
      ? [
          activeCategory.slug,
          ...categories.filter((c) => c.parentId === activeCategory.id).map((c) => c.slug),
        ]
      : activeCategorySlug;

    return filterAndSortProducts(allProducts, {
      filter: filterParam,
      category: categorySlugs,
      sort: sortParam,
    });
  }, [allProducts, categories, activeCategorySlug, filterParam, sortParam]);

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
          <ProductGrid products={products} />
        </div>
      </Container>
    </div>
  );
}
