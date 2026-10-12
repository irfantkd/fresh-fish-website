import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustHighlights } from "@/components/sections/TrustHighlights";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { ShopSection } from "@/components/sections/ShopSection";
import { CutsSection } from "@/components/sections/CutsSection";
import { SourcingSection } from "@/components/sections/SourcingSection";
import { VisitShopSection } from "@/components/sections/VisitShopSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { DeliveryAreasSection } from "@/components/sections/DeliveryAreasSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FishmongerSection } from "@/components/sections/FishmongerSection";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { LatestBlogSection } from "@/components/sections/LatestBlogSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { SectionSkeleton, DarkSectionSkeleton, HeroSkeleton } from "@/components/ui/SectionSkeleton";
import { getProductCount, formatProductCountClaim } from "@/lib/services/products.service";

export async function generateMetadata(): Promise<Metadata> {
  const countClaim = formatProductCountClaim(await getProductCount());
  return {
    title: "Fresh Fish Dubai | 2-Hour Seafood Delivery Dubai, UAE",
    description: `Fresh Fish Dubai: ${countClaim} fresh and frozen seafood products from our Waterfront Market shop, since 2018. 2-hour delivery in Dubai, UAE. Cash on delivery.`,
    alternates: { canonical: "/" },
  };
}

// Each data-fetching section gets its own Suspense boundary so the page
// streams progressively — a slow section (e.g. one waiting on the backend)
// no longer blocks everything else from appearing. Static sections (Cuts,
// Sourcing, HowItWorks, Fishmonger, VisitShop) need no boundary; they render
// immediately regardless.
export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<SectionSkeleton rows={4} />}>
        <TrustHighlights />
      </Suspense>
      <Suspense fallback={<SectionSkeleton rows={6} />}>
        <CategoriesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton rows={4} />}>
        <ShopSection />
      </Suspense>
      <CutsSection />
      <SourcingSection />
      <Suspense fallback={<DarkSectionSkeleton />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<SectionSkeleton rows={5} />}>
        <DeliveryAreasSection />
      </Suspense>
      <HowItWorks />
      <FishmongerSection />
      <Suspense fallback={null}>
        <CustomerReviews />
      </Suspense>
      <Suspense fallback={<SectionSkeleton rows={4} />}>
        <LatestBlogSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton rows={1} />}>
        <FaqSection />
      </Suspense>
      <VisitShopSection />
      <Suspense fallback={<DarkSectionSkeleton />}>
        <FinalCtaSection />
      </Suspense>
    </>
  );
}
