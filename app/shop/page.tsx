import type { Metadata } from "next";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop Fresh Seafood Online",
  description:
    "Browse our full range of fresh and frozen seafood — fish, shrimp, crab, lobster and more. Delivered fast across Dubai.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return <ShopPageClient />;
}
