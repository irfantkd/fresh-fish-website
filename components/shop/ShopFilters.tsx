"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import type { Category } from "@/types";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Fresh Today", value: "fresh" },
  { label: "Frozen", value: "frozen" },
  { label: "Best Sellers", value: "best-sellers" },
  { label: "Seasonal", value: "seasonal" },
  { label: "Premium", value: "premium" },
];

const SORTS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

export function ShopFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("filter") ?? "all";
  const activeCategory = searchParams.get("category") ?? "all";
  const activeSort = searchParams.get("sort") ?? "newest";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => updateParam("filter", f.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
              activeFilter === f.value
                ? "border-ocean-800 bg-ocean-800 text-white"
                : "border-gray-200 text-gray-600 hover:border-ocean-300"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParam("category", "all")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              activeCategory === "all"
                ? "border-aqua-500 bg-aqua-500/10 text-aqua-700"
                : "border-gray-200 text-gray-500 hover:border-aqua-300"
            )}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateParam("category", cat.slug)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === cat.slug
                  ? "border-aqua-500 bg-aqua-500/10 text-aqua-700"
                  : "border-gray-200 text-gray-500 hover:border-aqua-300"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <select
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          aria-label="Sort products"
          className="h-10 rounded-full border border-gray-200 bg-white px-4 text-xs font-medium text-gray-600 focus:border-aqua-400 focus:outline-none"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
