import { apiGet } from "@/lib/api-client";
import type { FaqItem } from "@/types";

// Every published FAQ — used by the full /faq page.
export async function getFaqs(): Promise<FaqItem[]> {
  return apiGet<FaqItem[]>("/faqs", { status: "published" });
}

// Only the curated subset an admin has opted into the homepage's condensed
// accordion — the full /faq page always shows every published FAQ regardless.
export async function getHomepageFaqs(): Promise<FaqItem[]> {
  return apiGet<FaqItem[]>("/faqs", { status: "published", homepage: "true" });
}
