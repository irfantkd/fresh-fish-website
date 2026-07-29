"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CategoryCard } from "@/components/product/CategoryCard";
import { GridSkeleton } from "@/components/ui/GridSkeleton";
import { FadeIn } from "@/components/animations/FadeIn";
import { useGetQuery } from "@/store/apiSlice";
import type { Category } from "@/types";

export function CategoriesPageClient() {
  const { data, isLoading } = useGetQuery({ path: "/categories" });
  const categories = (data as Category[] | undefined) ?? [];

  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: "Categories", url: "/categories" }]} />
        <SectionHeading
          eyebrow="Shop by Category"
          title="Every Catch, Perfectly Sorted"
          description="From delicate white fish to indulgent shellfish — explore our full range, sourced daily from trusted waters."
          className="mt-6"
        />

        {isLoading ? (
          <div className="mt-10">
            <GridSkeleton count={6} className="sm:grid-cols-2 lg:grid-cols-3" />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <FadeIn key={category.id} delay={i * 0.06}>
                <CategoryCard category={category} />
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
