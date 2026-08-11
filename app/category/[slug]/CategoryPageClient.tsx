"use client";

import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { ProductGrid } from "@/components/product/ProductGrid";
import { GridSkeleton } from "@/components/ui/GridSkeleton";
import { useGetQuery } from "@/store/apiSlice";
import type { Category, Product } from "@/types";

interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export function CategoryPageClient({ slug }: { slug: string }) {
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetQuery({
    path: "/categories",
  });
  const categories = (categoriesData as Category[] | undefined) ?? [];
  const category = categories.find((c) => c.slug === slug);

  const { data: productsData, isLoading: isLoadingProducts } = useGetQuery(
    { path: "/products", params: { categorySlug: slug, status: "published" } },
    { skip: !category }
  );
  const products = (productsData as ProductsResponse | undefined)?.items ?? [];

  if (!isLoadingCategories && !category) {
    notFound();
  }

  if (isLoadingCategories || !category) {
    return (
      <div className="py-12">
        <Container>
          <div className="h-96 w-full animate-pulse rounded-3xl bg-gray-100" />
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <Breadcrumb
          items={[
            { name: "Shop", url: "/shop" },
            { name: category.name, url: `/category/${category.slug}` },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-12">
          <div className="flex flex-col gap-3 lg:pt-2 lg:sticky lg:top-24">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-aqua-600">
              Category
            </span>
            <h1 className="text-balance font-heading text-3xl font-bold tracking-tight text-ocean-950 sm:text-4xl lg:text-5xl">
              {category.name}
            </h1>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-gray-100">
              <SeafoodImage
                src={category.featuredImage.url}
                alt={category.featuredImage.alt || category.name}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 90vw"
                className="object-cover"
              />
            </div>
            {category.topContent && (
              <div
                className="cms-content"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: category.topContent }}
              />
            )}
          </div>
        </div>

        <div className="mt-10">
          {isLoadingProducts ? <GridSkeleton count={8} /> : <ProductGrid products={products} />}
        </div>

        {category.bottomContent && (
          <div
            className="cms-content mt-16"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: category.bottomContent }}
          />
        )}
      </Container>
    </div>
  );
}
