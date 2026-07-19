import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CategoryCard } from "@/components/product/CategoryCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { getAllCategories } from "@/lib/services/categories.service";

export const metadata: Metadata = {
  title: "Shop by Category",
  description:
    "Browse fresh fish, salmon, shrimp & prawns, crab, lobster, and shellfish — hand-picked and delivered fresh across Dubai.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

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
          {categories.map((category, i) => (
            <FadeIn key={category.id} delay={i * 0.06}>
              <CategoryCard category={category} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </div>
  );
}
