"use client";

import { notFound } from "next/navigation";
import { Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductDetailTabs } from "@/components/product/ProductDetailTabs";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { useGetQuery } from "@/store/apiSlice";
import { formatAED, formatWeight } from "@/lib/utils/format";
import type { Product } from "@/types";

interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

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

export function ProductPageClient({ slug }: { slug: string }) {
  const {
    data: product,
    isLoading,
    isError,
  } = useGetQuery({ path: `/products/slug/${slug}` }) as {
    data: Product | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const { data: relatedData } = useGetQuery(
    { path: "/products", params: { categorySlug: product?.categorySlug, status: "published" } },
    { skip: !product }
  );
  const related = ((relatedData as ProductsResponse | undefined)?.items ?? [])
    .filter((p) => p.id !== product?.id)
    .slice(0, 4);

  if (!isLoading && (isError || !product)) {
    notFound();
  }

  if (isLoading || !product) {
    return (
      <div className="py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="aspect-square w-full animate-pulse rounded-3xl bg-gray-100" />
            <div className="flex flex-col gap-4">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
              <div className="h-9 w-2/3 animate-pulse rounded-lg bg-gray-100" />
              <div className="h-20 w-full animate-pulse rounded-2xl bg-gray-100" />
              <div className="h-32 w-full animate-pulse rounded-2xl bg-gray-100" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const galleryImages = [product.featuredImage, ...product.gallery]
    .filter((img) => img?.url)
    .map((img) => img.url);

  const faqs =
    product.faqs.length > 0
      ? product.faqs.map((faq, index) => ({ id: `product-faq-${index}`, ...faq }))
      : PRODUCT_FAQS;

  const detailTabs = [
    {
      title: "Description",
      content: (
        <div
          className="cms-content"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: product.description || "<p>No description available yet.</p>",
          }}
        />
      ),
    },
    ...(product.sizes.length > 1
      ? [
          {
            title: "Sizes & Pricing",
            content: (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                      <th className="pb-3 pr-4 font-semibold">Size</th>
                      <th className="pb-3 pr-4 font-semibold">Weight</th>
                      <th className="pb-3 font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {product.sizes.map((size) => (
                      <tr key={size.label}>
                        <td className="py-3 pr-4 font-semibold text-ocean-950">{size.label}</td>
                        <td className="py-3 pr-4 text-gray-500">
                          {formatWeight(size.weightGrams)}
                        </td>
                        <td className="py-3">
                          <span className="font-semibold text-ocean-900">
                            {formatAED(size.price)}
                          </span>
                          {size.compareAtPrice && size.compareAtPrice > size.price && (
                            <span className="ml-2 text-xs text-gray-400 line-through">
                              {formatAED(size.compareAtPrice)}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          },
        ]
      : []),
    ...product.tabs.map((tab) => ({
      title: tab.title,
      content: (
        <div
          className="cms-content"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: tab.content }}
        />
      ),
    })),
    {
      title: "FAQs",
      content: <FaqAccordion faqs={faqs} bare />,
    },
    {
      title: "Shipping & Delivery",
      content: (
        <div className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
          <Truck className="mt-0.5 h-5 w-5 shrink-0 text-aqua-600" />
          <p>
            Same-day delivery available for orders placed before 2 PM across Dubai. Cold-chain
            packaging keeps your seafood fresh from our facility to your door.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="py-12">
      <Container>
        <Breadcrumb
          items={[
            { name: "Shop", url: "/shop" },
            ...(product.categoryName && product.categorySlug
              ? [{ name: product.categoryName, url: `/category/${product.categorySlug}` }]
              : []),
            { name: product.name, url: `/product/${product.slug}` },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={galleryImages} name={product.name} />
          <ProductPurchasePanel product={product} />
        </div>

        <div className="mt-20">
          <ProductDetailTabs tabs={detailTabs} />
        </div>

        <div className="mt-20">
          <SectionHeading eyebrow="Customer Reviews" title="What People Are Saying" />
          <div className="mt-8 max-w-3xl">
            <ProductReviews productId={product.id} />
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
