import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { CategoryQuickCard } from "@/components/sections/CategoryQuickCard";
import { getAllCategories } from "@/lib/services/categories.service";

export async function CategoriesSection() {
  // Fetched server-side (during the page's own render) instead of via a
  // client-side round trip after hydration — the grid is in the first HTML
  // response, with no loading skeleton flash.
  const categories = (await getAllCategories()).filter((c) => !c.parentId);

  if (categories.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            as="h1"
            eyebrow="Shop by Category"
            title="Shop Fresh Fish and Seafood in Dubai, UAE"
            description="Fresh or frozen, whole or cut to order. Pick a category."
            align="center"
            className="mx-auto"
          />
        </FadeIn>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category, i) => (
            <FadeIn key={category.id} delay={i * 0.06}>
              <CategoryQuickCard category={category} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
