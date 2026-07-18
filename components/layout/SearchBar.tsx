"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { searchProducts } from "@/lib/services/products.service";
import { formatAED } from "@/lib/utils/format";
import { getLowestPrice } from "@/lib/utils/product";
import type { Product } from "@/types";

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 250);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    searchProducts(debouncedQuery).then((res) => {
      if (active) setResults(res);
    });
    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = isFocused && query.trim().length > 0;

  return (
    <div ref={containerRef} className={className}>
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search salmon, prawns, crab..."
          aria-label="Search products"
          className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm text-ocean-950 placeholder:text-gray-400 focus:border-aqua-400 focus:bg-white focus:outline-none"
        />
        {query && (
          <button
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="absolute right-3.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-40 mt-2 max-h-96 w-full max-w-md overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-xl"
          >
            {results.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-gray-400">
                No seafood found for &ldquo;{query}&rdquo;
              </p>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={() => setIsFocused(false)}
                  className="flex items-center gap-3 rounded-xl p-2 hover:bg-ocean-50"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <SeafoodImage
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-semibold text-ocean-950">
                      {product.name}
                    </span>
                    <span className="text-xs text-gray-400">{product.origin.country}</span>
                  </div>
                  <span className="text-sm font-bold text-ocean-800">
                    {formatAED(getLowestPrice(product))}
                  </span>
                </Link>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
