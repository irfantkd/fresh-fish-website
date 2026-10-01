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
import { getProductCount, formatProductCountClaim } from "@/lib/services/products.service";

export async function generateMetadata(): Promise<Metadata> {
  const countClaim = formatProductCountClaim(await getProductCount());
  return {
    title: "Fresh Fish Dubai | 2-Hour Seafood Delivery Dubai, UAE",
    description: `Fresh Fish Dubai: ${countClaim} fresh and frozen seafood products from our Waterfront Market shop, since 2018. 2-hour delivery in Dubai, UAE. Cash on delivery.`,
    alternates: { canonical: "/" },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustHighlights />
      <CategoriesSection />
      <ShopSection />
      <CutsSection />
      <SourcingSection />
      <WhyChooseUs />
      <DeliveryAreasSection />
      <HowItWorks />
      <FishmongerSection />
      <CustomerReviews />
      <LatestBlogSection />
      <FaqSection />
      <VisitShopSection />
      <FinalCtaSection />
    </>
  );
}
