"use client";

import Link from "next/link";
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
  const topLevel = categories.filter((c) => !c.parentId);
  const childrenByParent = categories.reduce<Record<string, Category[]>>((map, c) => {
    if (!c.parentId) return map;
    (map[c.parentId] ??= []).push(c);
    return map;
  }, {});

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
            {topLevel.map((category, i) => {
              const children = childrenByParent[category.id] ?? [];
              return (
                <FadeIn key={category.id} delay={i * 0.06} className="flex flex-col gap-3">
                  <CategoryCard category={category} />
                  {children.length > 0 && (
                    <div className="flex flex-wrap gap-2 px-1">
                      {children.map((child) => (
                        <Link
                          key={child.id}
                          href={`/category/${child.slug}`}
                          className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-ocean-800 transition-colors hover:border-ocean-300 hover:bg-ocean-50"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </FadeIn>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
