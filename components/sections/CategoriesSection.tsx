"use client";

import { CategoryCard } from "@/components/product/CategoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { GridSkeleton } from "@/components/ui/GridSkeleton";
import { FadeIn } from "@/components/animations/FadeIn";
import { useGetQuery } from "@/store/apiSlice";
import type { Category } from "@/types";

export function CategoriesSection() {
  const { data, isLoading } = useGetQuery({ path: "/categories" });
  const categories = (data as Category[] | undefined) ?? [];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Shop by Category"
            title="Every Catch, Perfectly Sorted"
            description="From delicate white fish to indulgent shellfish — explore our full range, sourced daily from trusted waters."
            align="center"
            className="mx-auto"
          />
        </FadeIn>

        {isLoading ? (
          <div className="mt-12">
            <GridSkeleton count={6} className="sm:grid-cols-2 lg:grid-cols-3" />
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <FadeIn key={category.id} delay={i * 0.08}>
                <CategoryCard category={category} />
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
