import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { ShopSection } from "@/components/sections/ShopSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { DeliveryAreasSection } from "@/components/sections/DeliveryAreasSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Live & Fresh Seafood Delivery in Dubai`,
  description: SITE_CONFIG.description,
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
      <DeliveryAreasSection />
      <FaqSection />
    </>
  );
}
