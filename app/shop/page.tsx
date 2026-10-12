import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { getAllProducts } from "@/lib/services/products.service";
import { getAllCategories } from "@/lib/services/categories.service";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: `Shop Fresh Seafood Online | ${SITE_CONFIG.name}`,
  description:
    "Browse our full range of fresh and frozen seafood — fish, shrimp, crab, lobster and more. Delivered fast across Dubai.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  // Fetched here (server-side, in parallel) instead of two client-side
  // round trips after hydration — the full catalog is in the first HTML
  // response. Filtering/sorting by the URL's search params still happens
  // client-side (ShopPageClient), but against data that's already loaded,
  // not re-fetched.
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return <ShopPageClient allProducts={products} categories={categories} />;
}
