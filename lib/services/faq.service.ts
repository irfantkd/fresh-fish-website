import { FAQS } from "@/lib/data/faq.data";
import { getProductCount, formatProductCountClaim } from "@/lib/services/products.service";
import type { FaqItem } from "@/types";

export async function getFaqs(): Promise<FaqItem[]> {
  // The "how many products" answer is kept honest against the real catalog
  // size instead of a hardcoded number baked into the static FAQ data.
  const countClaim = formatProductCountClaim(await getProductCount());
  return FAQS.map((faq) =>
    faq.id === "f-8"
      ? {
          ...faq,
          answer: `We sell ${countClaim} products, both fresh and frozen. Every product page says which. See the full shop.`,
        }
      : faq
  );
}
