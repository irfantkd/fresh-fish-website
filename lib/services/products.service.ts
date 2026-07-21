import { apiGet, apiGetOrUndefined } from "@/lib/api-client";
import type { Product } from "@/types";

interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Service layer for product data. Every export is async and backed by
 * fresh-fish-api — the same REST API the dashboard writes to — so content
 * authored in the dashboard shows up here without any caller changes.
 */

export async function getAllProducts(): Promise<Product[]> {
  const res = await apiGet<ProductsResponse>("/products", { status: "published" });
  return res.items;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const product = await apiGetOrUndefined<Product>(`/products/slug/${slug}`);
  return product && product.status === "published" ? product : undefined;
}

export async function getBestSellers(limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.isBestSeller).slice(0, limit);
}

export async function getFreshTodayProducts(limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.isFreshToday).slice(0, limit);
}

export async function getSeasonalProducts(limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.isSeasonal).slice(0, limit);
}

export async function getPremiumProducts(limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.isPremium).slice(0, limit);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const res = await apiGet<ProductsResponse>("/products", {
    status: "published",
    categorySlug,
  });
  return res.items;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await getProductsByCategory(product.categorySlug);
  return products.filter((p) => p.id !== product.id).slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return [];
  const res = await apiGet<ProductsResponse>("/products", { status: "published", search: q });
  return res.items;
}
