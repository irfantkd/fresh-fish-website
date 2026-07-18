import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllCategories, getCategoryBySlug } from "@/lib/services/categories.service";
import { getProductsByCategory } from "@/lib/services/products.service";
import { SITE_CONFIG } from "@/constants/site";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} | Fresh Seafood Delivered in Dubai`,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: category.name,
      description: category.description,
      images: [{ url: category.image }],
      url: `${SITE_CONFIG.url}/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <div className="py-12">
      <Container>
        <Breadcrumb
          items={[
            { name: "Shop", url: "/shop" },
            { name: category.name, url: `/category/${category.slug}` },
          ]}
        />
        <SectionHeading
          eyebrow="Category"
          title={category.name}
          description={category.description}
          className="mt-6"
        />
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </Container>
    </div>
  );
}
