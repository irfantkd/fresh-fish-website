import { SITE_CONFIG } from "@/constants/site";
import { getLowestSize } from "@/lib/utils/product";
import { stripHtml } from "@/lib/utils/format";
import type { BlogPost, Category, FaqItem, Product } from "@/types";

/**
 * Admins can paste a complete custom JSON-LD object per product/category/blog
 * post in the dashboard. When present (and valid JSON), it's used verbatim
 * instead of the auto-generated schema below — giving full control for
 * anyone who wants to hand-tune structured data, while everyone else gets a
 * Google-compatible schema for free with zero setup.
 */
export function resolveJsonLd<T extends object>(
  customSchema: string | undefined,
  generate: () => T
): object {
  if (customSchema?.trim()) {
    try {
      return JSON.parse(customSchema);
    } catch {
      // Malformed custom JSON shouldn't ever ship broken structured data —
      // fall back to the auto-generated schema instead.
    }
  }
  return generate();
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [SITE_CONFIG.social.instagram, SITE_CONFIG.social.facebook],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export function productJsonLd(product: Product) {
  const size = getLowestSize(product);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [product.featuredImage.url, ...product.gallery.map((g) => g.url)],
    brand: { "@type": "Brand", name: SITE_CONFIG.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: size.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_CONFIG.url}/product/${product.slug}`,
    },
    aggregateRating: product.reviewCount
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        }
      : undefined,
  };
}

export function categoryJsonLd(category: Category) {
  const description =
    category.seo?.metaDescription ||
    stripHtml(category.topContent).slice(0, 300) ||
    `Shop ${category.name} at ${SITE_CONFIG.name}.`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description,
    url: `${SITE_CONFIG.url}/category/${category.slug}`,
    image: category.featuredImage?.url || undefined,
    isPartOf: { "@type": "WebSite", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: category.productCount,
    },
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.metaDescription || "",
    image: post.featuredImage?.url ? [post.featuredImage.url] : undefined,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : { "@type": "Organization", name: SITE_CONFIG.name },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: { "@type": "ImageObject", url: `${SITE_CONFIG.url}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_CONFIG.url}/blog/${post.slug}` },
  };
}
