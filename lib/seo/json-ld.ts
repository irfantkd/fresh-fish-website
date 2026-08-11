import { SITE_CONFIG } from "@/constants/site";
import { getLowestSize } from "@/lib/utils/product";
import { stripHtml } from "@/lib/utils/format";
import type { BlogPost, Category, FaqItem, Product } from "@/types";

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
