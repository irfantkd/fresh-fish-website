import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
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

  const title = category.seo?.metaTitle || `${category.name} | Fresh Seafood Delivered in Dubai`;
  const description = category.seo?.metaDescription || category.description;

  return {
    title,
    description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: category.featuredImage.url, alt: category.featuredImage.alt || category.name }],
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

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:items-center">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-gray-100">
            <SeafoodImage
              src={category.featuredImage.url}
              alt={category.featuredImage.alt || category.name}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-aqua-600">
              Category
            </span>
            <h1 className="text-balance font-heading text-3xl font-bold tracking-tight text-ocean-950 sm:text-4xl lg:text-5xl">
              {category.name}
            </h1>
            <p className="max-w-2xl text-base text-gray-500 sm:text-lg">{category.description}</p>
          </div>
        </div>

        {category.topContent && (
          <div
            className="cms-content mt-10"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: category.topContent }}
          />
        )}

        <div className="mt-10">
          <ProductGrid products={products} />
        </div>

        {category.bottomContent && (
          <div
            className="cms-content mt-16"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: category.bottomContent }}
          />
        )}
      </Container>
    </div>
  );
}
