import { SITE_CONFIG } from "@/constants/site";
import { seafoodImage } from "@/lib/utils/seafood-image";
import type { Banner } from "@/types";

/**
 * Homepage banner slides. Swap `image` for an uploaded banner asset (e.g. a
 * CMS/admin upload) at any time — nothing else needs to change.
 */
export const BANNERS: Banner[] = [
  {
    id: "b-1",
    image: seafoodImage("salmon,fresh", 401),
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
    image: seafoodImage("lobster,seafood", 402),
    eyebrow: "Premium Selection",
    title: "Lobster, King Crab & Other Indulgent Catches",
    subtitle: "Restaurant-grade seafood for special occasions, hand-picked just for you.",
    primaryCta: { label: "Explore Premium", href: "/shop?filter=premium" },
  },
  {
    id: "b-3",
    image: seafoodImage("shrimp,prawn", 403),
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
    id: "b-4",
    image: seafoodImage("crab,seafood", 404),
    eyebrow: "Fast & Reliable",
    title: "Free Home Delivery Across Dubai",
    subtitle: "Hygienic, cold-chain delivery straight to your door, wherever you are.",
    primaryCta: { label: "Check Delivery Areas", href: "/delivery-areas" },
  },
];
