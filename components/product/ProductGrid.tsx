import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";
import { cn } from "@/lib/utils/cn";

export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 py-16 text-center text-gray-400">
        No products found.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
