"use client";

import Link from "next/link";
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
  const subcategories = category
    ? categories.filter((c) => c.parentId === category.id)
    : [];

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
      <div className="pb-12">
        <div className="h-[38vh] min-h-56 w-full animate-pulse bg-gray-100 sm:h-[45vh] sm:min-h-72 lg:h-[50vh] lg:max-h-100" />
        <Container>
          <div className="mt-8 h-32 w-full animate-pulse rounded-3xl bg-gray-100" />
        </Container>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: "Shop", url: "/shop" },
    ...(category.parentId && category.parentSlug
      ? [{ name: category.parentName ?? "", url: `/category/${category.parentSlug}` }]
      : []),
    { name: category.name, url: `/category/${category.slug}` },
  ];

  return (
    <div className="pb-12">
      {/* Full-bleed hero banner — image with a top-transparent/bottom-black
          gradient so the overlaid heading stays legible against any photo. */}
      <div className="relative h-[38vh] min-h-56 w-full overflow-hidden bg-gray-100 sm:h-[45vh] sm:min-h-72 lg:h-[50vh] lg:max-h-100">
        <SeafoodImage
          src={category.featuredImage.url}
          alt={category.featuredImage.alt || category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-6 sm:pb-8 lg:pb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-aqua-300">
            {category.parentName ? `${category.parentName} · Subcategory` : "Category"}
          </span>
          <h1 className="mt-2 text-balance font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {category.name}
          </h1>
        </Container>
      </div>

      <Container>
        <div className="pt-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {subcategories.length > 0 && (
          <div className="mt-8">
            <span className="mb-3 block text-sm font-semibold text-ocean-950">
              Shop by Subcategory
            </span>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/category/${category.slug}`}
                className="rounded-full border border-ocean-800 bg-ocean-800 px-4 py-2 text-sm font-medium text-white"
              >
                All {category.name}
              </Link>
              {subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/category/${sub.slug}`}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-ocean-900 transition-colors hover:border-ocean-300 hover:bg-ocean-50"
                >
                  {sub.name}
                  <span className="ml-1.5 text-xs text-gray-400">({sub.productCount})</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {category.topContent && (
          <div
            className="cms-content mt-8"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: category.topContent }}
          />
        )}

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
