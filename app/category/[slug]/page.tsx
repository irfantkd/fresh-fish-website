import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryBySlug } from "@/lib/services/categories.service";
import { categoryJsonLd } from "@/lib/seo/json-ld";
import { stripHtml } from "@/lib/utils/format";
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
  const description =
    category.seo?.metaDescription ||
    stripHtml(category.topContent).slice(0, 160) ||
    `Shop ${category.name} online — fresh, hand-picked, and delivered across Dubai.`;

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

  return (
    <>
      {/* Rendered server-side so search engines always see structured data
          in the initial HTML, regardless of client-side fetch/hydration
          timing (the visible page body is client-rendered — see
          CategoryPageClient). */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd(category)) }}
      />
      <CategoryPageClient slug={slug} />
    </>
  );
}
