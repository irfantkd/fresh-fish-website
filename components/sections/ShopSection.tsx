"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GridSkeleton } from "@/components/ui/GridSkeleton";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductTabs } from "@/components/sections/ProductTabs";
import { useGetQuery } from "@/store/apiSlice";
import type { Product } from "@/types";

interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export function ShopSection() {
  const { data, isLoading } = useGetQuery({
    path: "/products",
    params: { status: "published" },
  });
  const products = (data as ProductsResponse | undefined)?.items ?? [];

  const tabs = [
    { label: "Fresh Today", products: products.filter((p) => p.isFreshToday).slice(0, 8) },
    { label: "Best Sellers", products: products.filter((p) => p.isBestSeller).slice(0, 8) },
    { label: "Premium Selection", products: products.filter((p) => p.isPremium).slice(0, 8) },
    { label: "Seasonal Picks", products: products.filter((p) => p.isSeasonal).slice(0, 8) },
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
          {isLoading ? <GridSkeleton count={8} /> : <ProductTabs tabs={tabs} />}
        </div>
      </Container>
    </section>
  );
}
