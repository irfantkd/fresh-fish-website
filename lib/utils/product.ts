import type { Product, ProductSize } from "@/types";

export function getLowestSize(product: Product): ProductSize {
  return product.sizes.reduce((lowest, size) =>
    size.price < lowest.price ? size : lowest
  );
}

export function getLowestPrice(product: Product): number {
  return getLowestSize(product).price;
}
