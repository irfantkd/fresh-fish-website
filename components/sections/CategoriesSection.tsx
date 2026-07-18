import { CategoryCard } from "@/components/product/CategoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { getAllCategories } from "@/lib/services/categories.service";

export async function CategoriesSection() {
  const categories = await getAllCategories();

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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <FadeIn key={category.id} delay={i * 0.08}>
              <CategoryCard category={category} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
