import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getRandomProducts } from "@/lib/services/products.service";

export async function ShopSection() {
  // A random 12 published products, sampled at the database level — never
  // cached, so a fresh set of 12 is picked on every page load/refresh.
  const products = await getRandomProducts(12);

  return (
    <section className="bg-gray-50/60 py-20 sm:py-28">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <SectionHeading
              eyebrow="Shop Live & Fresh"
              title="Popular Fish and Seafood Today"
              description="Fresh and frozen, cleaned and prepared to your order. Live stock and prices, updated daily."
              className="items-center text-center sm:items-start sm:text-left [&_p]:mx-auto sm:[&_p]:mx-0"
            />
            <Button href="/shop" variant="outline" size="md" className="shrink-0">
              View Full Shop <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <ProductGrid products={products} />
        </FadeIn>
      </Container>
    </section>
  );
}
