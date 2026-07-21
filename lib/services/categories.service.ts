import { apiGet } from "@/lib/api-client";
import type { Category } from "@/types";

export async function getAllCategories(): Promise<Category[]> {
  return apiGet<Category[]>("/categories");
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getAllCategories();
  return categories.find((c) => c.slug === slug);
}
