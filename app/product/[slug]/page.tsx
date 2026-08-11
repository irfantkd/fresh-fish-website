import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/services/products.service";
import { productJsonLd } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/constants/site";
import { ProductPageClient } from "./ProductPageClient";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title = product.seo?.metaTitle || product.name;
  const description = product.seo?.metaDescription || product.shortDescription;
  const images = [product.featuredImage, ...product.gallery].filter((img) => img?.url);
  const canonical = product.seo?.canonicalUrl || `/product/${product.slug}`;

  return {
    title,
    description,
    keywords: product.seo?.keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      images: images.map((img) => ({ url: img.url, alt: img.alt || product.name })),
      url: `${SITE_CONFIG.url}/product/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      {/* Rendered server-side (not via the client component below) so search
          engines always see structured data in the initial HTML, regardless
          of client-side data fetching/hydration timing. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <ProductPageClient slug={slug} />
    </>
  );
}
