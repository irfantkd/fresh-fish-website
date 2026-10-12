import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CategoryCard } from "@/components/product/CategoryCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { getAllCategories } from "@/lib/services/categories.service";
import { SITE_CONFIG } from "@/constants/site";
import type { Category } from "@/types";

export const metadata: Metadata = {
  title: `Shop by Category | ${SITE_CONFIG.name}`,
  description:
    "Browse fresh fish, salmon, shrimp & prawns, crab, lobster, and shellfish — hand-picked and delivered fresh across Dubai.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  // Fetched here (server-side) instead of a client-side round trip after
  // hydration — the grid is in the first HTML response, with no loading
  // skeleton flash.
  const categories = await getAllCategories();
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
      </Container>
    </div>
  );
}
