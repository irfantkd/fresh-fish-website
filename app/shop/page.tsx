import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { getAllCategories } from "@/lib/services/categories.service";
import { getAllProducts } from "@/lib/services/products.service";
import { filterAndSortProducts } from "@/lib/utils/filterProducts";

export const metadata: Metadata = {
  title: "Shop Fresh Seafood Online",
  description:
    "Browse our full range of fresh and frozen seafood — fish, shrimp, crab, lobster and more. Delivered fast across Dubai.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const [allProducts, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  const products = filterAndSortProducts(allProducts, params);

  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: "Shop", url: "/shop" }]} />
        <SectionHeading
          eyebrow="Our Shop"
          title="Every Fresh Catch, One Place"
          description="Filter by category, freshness, or price to find exactly what you need for tonight's dinner."
          className="mt-6"
        />

        <div className="mt-8">
          <ShopFilters categories={categories} />
        </div>

        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </Container>
    </div>
  );
}
