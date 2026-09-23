import { SITE_CONFIG } from "@/constants/site";
import type { Banner } from "@/types";

/**
 * Homepage banner slides. Images are real photos pasted into
 * public/assets/images/ — swap the `image` path for a different uploaded
 * banner asset at any time, nothing else needs to change.
 */
export const BANNERS: Banner[] = [
  {
    id: "b-1",
    image: "/assets/images/Header1.jpeg",
    eyebrow: "100% Live & Fresh",
    title: "Fresh Fish & Seafood, Delivered to Your Door",
    subtitle: "Hand-picked, prepared to your order, and delivered fresh — every single time.",
    primaryCta: { label: "Shop Now", href: "/shop" },
    secondaryCta: {
      label: "Order on WhatsApp",
      href: `https://wa.me/${SITE_CONFIG.whatsappNumber}`,
      external: true,
    },
  },
  {
    id: "b-2",
    image: "/assets/images/header2.jpeg",
    eyebrow: "Premium Selection",
    title: "Lobster, King Crab & Other Indulgent Catches",
    subtitle: "Restaurant-grade seafood for special occasions, hand-picked just for you.",
    primaryCta: { label: "Explore Premium", href: "/shop?filter=premium" },
  },
  {
    id: "b-3",
    image: "/assets/images/header-3.jpeg",
    eyebrow: "Sourced Daily",
    title: "A Full Catch of the Day, Every Day",
    subtitle: "From sea bass to red snapper — hand-graded for freshness before it reaches you.",
    primaryCta: { label: "Browse the Catch", href: "/shop" },
  },
  {
    id: "b-4",
    image: "/assets/images/header4.jpeg",
    eyebrow: "Always Available",
    title: "Order Anytime — We're Open 24/7",
    subtitle: "Message us on WhatsApp any hour of the day for a custom order.",
    primaryCta: {
      label: "Order on WhatsApp",
      href: `https://wa.me/${SITE_CONFIG.whatsappNumber}`,
      external: true,
    },
    secondaryCta: { label: "Request a Custom Order", href: "/contact" },
  },
  {
    id: "b-5",
    image: "/assets/images/header5.jpeg",
    eyebrow: "Ocean to Table",
    title: "Every Variety, From Salmon to Scallops",
    subtitle: "One order, endless variety — fish, shellfish, and crustaceans on the same plate.",
    primaryCta: { label: "Shop Now", href: "/shop" },
  },
  {
    id: "b-6",
    image: "/assets/images/header6.jpeg",
    eyebrow: "Fast & Reliable",
    title: "Free Home Delivery Across Dubai",
    subtitle: "Hygienic, cold-chain delivery straight to your door, wherever you are.",
    primaryCta: { label: "Check Delivery Areas", href: "/delivery-areas" },
  },
];
