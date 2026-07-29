import type { Metadata } from "next";
import { getAllCategories, getCategoryBySlug } from "@/lib/services/categories.service";
import { SITE_CONFIG } from "@/constants/site";
import { CategoryPageClient } from "./CategoryPageClient";

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
  return <CategoryPageClient slug={slug} />;
}
