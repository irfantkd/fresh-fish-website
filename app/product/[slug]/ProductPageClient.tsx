"use client";

import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductDetailTabs } from "@/components/product/ProductDetailTabs";
import type { CustomerReview, Product } from "@/types";

export function ProductPageClient({
  product,
  related,
  reviews,
}: {
  product: Product;
  related: Product[];
  reviews: CustomerReview[];
}) {
  const galleryImages = [product.featuredImage, ...product.gallery]
    .filter((img) => img?.url)
    .map((img) => img.url);

  const detailTabs = [
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
      title: "Reviews",
      content: <ProductReviews productId={product.id} reviews={reviews} />,
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
