import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { CategoriesPageClient } from "./CategoriesPageClient";

export const metadata: Metadata = {
  title: `Shop by Category | ${SITE_CONFIG.name}`,
  description:
    "Browse fresh fish, salmon, shrimp & prawns, crab, lobster, and shellfish — hand-picked and delivered fresh across Dubai.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return <CategoriesPageClient />;
}
