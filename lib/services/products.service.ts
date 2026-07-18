import { PRODUCTS } from "@/lib/data/products.data";
import type { Product } from "@/types";

/**
 * Service layer for product data. Every export is async so this file can be
 * swapped for real fetch() calls to a backend API without touching callers.
 */

export async function getAllProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.slug === slug);
}

export async function getBestSellers(limit = 4): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.isBestSeller).slice(0, limit);
}

export async function getFreshTodayProducts(limit = 4): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.isFreshToday).slice(0, limit);
}

export async function getSeasonalProducts(limit = 4): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.isSeasonal).slice(0, limit);
}

export async function getPremiumProducts(limit = 4): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.isPremium).slice(0, limit);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      p.categorySlug.toLowerCase().includes(q)
  );
}
