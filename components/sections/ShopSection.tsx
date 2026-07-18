import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductTabs } from "@/components/sections/ProductTabs";
import {
  getBestSellers,
  getFreshTodayProducts,
  getPremiumProducts,
  getSeasonalProducts,
} from "@/lib/services/products.service";

export async function ShopSection() {
  const [freshToday, bestSellers, premium, seasonal] = await Promise.all([
    getFreshTodayProducts(8),
    getBestSellers(8),
    getPremiumProducts(8),
    getSeasonalProducts(8),
  ]);

  const tabs = [
    { label: "Fresh Today", products: freshToday },
    { label: "Best Sellers", products: bestSellers },
    { label: "Premium Selection", products: premium },
    { label: "Seasonal Picks", products: seasonal },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <SectionHeading
              eyebrow="Shop Live & Fresh"
              title="Hand-Picked, Ready to Deliver"
              description="No cooked meals — just live and fresh whole fish & seafood, cleaned and prepared to your order."
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
