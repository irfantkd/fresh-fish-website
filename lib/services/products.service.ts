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
 * fresh-fish-backend — the same REST API the dashboard writes to — so content
 * authored in the dashboard shows up here without any caller changes.
 */

export async function getAllProducts(): Promise<Product[]> {
  const res = await apiGet<ProductsResponse>("/products", { status: "published" });
  return res.items;
}

/**
 * The real published product count, fetched cheaply (limit: 1 — only the
 * `total` field is used, not the items). Used to back marketing copy like
 * "100+ products" with the real number instead of a hardcoded guess that
 * can go stale or become false as the catalog changes.
 */
export async function getProductCount(): Promise<number> {
  const res = await apiGet<ProductsResponse>("/products", { status: "published", limit: 1 });
  return res.total;
}

/** Rounds down to the nearest 10 so the claim is always true, e.g. 95 -> "90+". */
export function formatProductCountClaim(count: number): string {
  return `${Math.floor(count / 10) * 10}+`;
}

/**
 * A random sample of published products, picked at the database level
 * (backend uses MongoDB's $sample) so this fetches and decorates only the
 * `limit` products actually shown — not the full catalog filtered down
 * client-side. A fresh sample on every request since this is never cached.
 */
export async function getRandomProducts(limit = 12): Promise<Product[]> {
  const res = await apiGet<ProductsResponse>("/products", {
    status: "published",
    random: "true",
    limit,
  });
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
