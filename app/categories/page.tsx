import type { Metadata } from "next";
import { CategoriesPageClient } from "./CategoriesPageClient";

export const metadata: Metadata = {
  title: "Shop by Category",
  description:
    "Browse fresh fish, salmon, shrimp & prawns, crab, lobster, and shellfish — hand-picked and delivered fresh across Dubai.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return <CategoriesPageClient />;
}
