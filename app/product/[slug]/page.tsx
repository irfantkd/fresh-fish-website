import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/services/products.service";
import { getCategoryBySlug } from "@/lib/services/categories.service";
import { productJsonLd } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/constants/site";

const PRODUCT_FAQS = [
  {
    id: "pf-1",
    question: "How fresh is this product when delivered?",
    answer:
      "Fresh items are prepared and delivered the same day they're ordered. Frozen items are flash-frozen at peak quality and delivered still frozen.",
  },
  {
    id: "pf-2",
    question: "Can I request a specific cut or preparation?",
    answer:
      "Yes, add a note during checkout or mention it in your WhatsApp order and our fishmongers will prepare it to your preference.",
  },
];

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

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images.map((url) => ({ url })),
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

  const [related, category] = await Promise.all([
    getRelatedProducts(product, 4),
    getCategoryBySlug(product.categorySlug),
  ]);

  return (
    <div className="py-12">
      <Container>
        <Breadcrumb
          items={[
            { name: "Shop", url: "/shop" },
            ...(category
              ? [{ name: category.name, url: `/category/${category.slug}` }]
              : []),
            { name: product.name, url: `/product/${product.slug}` },
          ]}
        />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <ProductPurchasePanel product={product} />
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-heading text-xl font-bold text-ocean-950">
              Frequently Asked Questions
            </h2>
            <div className="mt-4">
              <FaqAccordion faqs={PRODUCT_FAQS} />
            </div>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-6">
            <h2 className="font-heading text-lg font-bold text-ocean-950">Delivery Info</h2>
            <p className="mt-2 text-sm text-gray-500">
              Same-day delivery available for orders placed before 2 PM across Dubai. Cold-chain
              packaging keeps your seafood fresh from our facility to your door.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <SectionHeading eyebrow="You Might Also Like" title="Related Products" />
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
