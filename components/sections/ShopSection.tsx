import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductTabs } from "@/components/sections/ProductTabs";
import { getAllProducts } from "@/lib/services/products.service";
import type { Product } from "@/types";

export async function ShopSection() {
  // Fetched server-side instead of via a client-side round trip after
  // hydration — the grid is in the first HTML response, with no loading
  // skeleton flash.
  const products = await getAllProducts();

  // Each tab prefers products flagged for it, but falls back to the general
  // catalog so a tab never goes empty just because no product has that
  // specific badge checked in the dashboard.
  function pickProducts(predicate: (p: Product) => boolean | undefined) {
    const flagged = products.filter(predicate);
    return (flagged.length > 0 ? flagged : products).slice(0, 8);
  }

  const tabs = [
    { label: "Fresh Today", products: pickProducts((p) => p.isFreshToday) },
    { label: "Best Sellers", products: pickProducts((p) => p.isBestSeller) },
    { label: "Premium Selection", products: pickProducts((p) => p.isPremium) },
    { label: "Seasonal Picks", products: pickProducts((p) => p.isSeasonal) },
  ];

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

        <div className="mt-10">
          <ProductTabs tabs={tabs} />
        </div>
      </Container>
    </section>
  );
}
