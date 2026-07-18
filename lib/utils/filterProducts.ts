import { getLowestPrice } from "@/lib/utils/product";
import type { Product } from "@/types";

export interface ProductFilterOptions {
  filter?: string;
  category?: string;
  sort?: string;
}

export function filterAndSortProducts(
  products: Product[],
  { filter, category, sort }: ProductFilterOptions
): Product[] {
  let result = [...products];

  if (category && category !== "all") {
    result = result.filter((p) => p.categorySlug === category);
  }

  switch (filter) {
    case "fresh":
      result = result.filter((p) => p.isFreshToday);
      break;
    case "frozen":
      result = result.filter((p) => p.state === "frozen");
      break;
    case "best-sellers":
      result = result.filter((p) => p.isBestSeller);
      break;
    case "seasonal":
      result = result.filter((p) => p.isSeasonal);
      break;
    case "premium":
      result = result.filter((p) => p.isPremium);
      break;
    default:
      break;
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
      break;
    case "price-desc":
      result.sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
}
