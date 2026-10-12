import { apiGet } from "@/lib/api-client";
import type { Category } from "@/types";

export async function getAllCategories(): Promise<Category[]> {
  // Category names/images/counts change rarely — a short cache avoids
  // re-fetching (and re-decorating, on the backend) the same list on every
  // single request. Verified this doesn't change any route's static/dynamic
  // classification (tested with and without it — identical build output).
  return apiGet<Category[]>("/categories", undefined, 60);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getAllCategories();
  return categories.find((c) => c.slug === slug);
}
