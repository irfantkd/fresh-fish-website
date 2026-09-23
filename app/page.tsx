import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { OpeningParagraph } from "@/components/sections/OpeningParagraph";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { ShopSection } from "@/components/sections/ShopSection";
import { FishNamesSection } from "@/components/sections/FishNamesSection";
import { CutsSection } from "@/components/sections/CutsSection";
import { SourcingSection } from "@/components/sections/SourcingSection";
import { VisitShopSection } from "@/components/sections/VisitShopSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { DeliveryAreasSection } from "@/components/sections/DeliveryAreasSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FishmongerSection } from "@/components/sections/FishmongerSection";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { FishGuidesSection } from "@/components/sections/FishGuidesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export const metadata: Metadata = {
  title: "Fresh Fish Dubai | 2-Hour Seafood Delivery Dubai, UAE",
  description:
    "Fresh Fish Dubai: 100+ fresh and frozen seafood products from our Waterfront Market shop, since 2020. 2-hour delivery in Dubai, UAE. Cash on delivery.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <OpeningParagraph />
      <CategoriesSection />
      <ShopSection />
      <FishNamesSection />
      <CutsSection />
      <SourcingSection />
      <VisitShopSection />
      <WhyChooseUs />
      <DeliveryAreasSection />
      <HowItWorks />
      <FishmongerSection />
      <CustomerReviews />
      <FishGuidesSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
