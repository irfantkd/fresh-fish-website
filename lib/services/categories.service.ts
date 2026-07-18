import { CATEGORIES } from "@/lib/data/categories.data";
import type { Category } from "@/types";

export async function getAllCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return CATEGORIES.find((c) => c.slug === slug);
}
