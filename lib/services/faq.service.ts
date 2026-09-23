import { FAQS } from "@/lib/data/faq.data";
import type { FaqItem } from "@/types";

export async function getFaqs(): Promise<FaqItem[]> {
  return FAQS;
}
