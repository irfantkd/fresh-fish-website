import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { ShopSection } from "@/components/sections/ShopSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { DeliveryAreasSection } from "@/components/sections/DeliveryAreasSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LatestBlogSection } from "@/components/sections/LatestBlogSection";

export const metadata: Metadata = {
  title: "Fresh Fish Dubai | 2-Hour Seafood Delivery Dubai, UAE",
  description:
    "Fresh Fish Dubai: 100+ fresh and frozen seafood products from our Waterfront Market shop, since 2018. 2-hour delivery in Dubai, UAE. Cash on delivery.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <ShopSection />
      <HowItWorks />
      <WhyChooseUs />
      <CustomerReviews />
      <LatestBlogSection />
      <DeliveryAreasSection />
      <FaqSection />
    </>
  );
}
