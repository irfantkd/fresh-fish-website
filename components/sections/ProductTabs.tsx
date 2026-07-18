"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types";

export function ProductTabs({
  tabs,
}: {
  tabs: { label: string; products: Product[] }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              active === i ? "text-white" : "text-gray-500 hover:text-ocean-900"
            )}
          >
            {active === i && (
              <motion.span
                layoutId="product-tab-pill"
                className="absolute inset-0 rounded-full bg-ocean-800"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tabs[active].label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ProductGrid products={tabs[active].products} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
