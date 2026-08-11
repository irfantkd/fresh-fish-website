"use client";

import { useState, type ReactNode } from "react";
import { getProductTabIcon } from "@/lib/utils/productTabIcon";
import { cn } from "@/lib/utils/cn";

export interface ProductDetailTab {
  title: string;
  content: ReactNode;
}

/** WooCommerce-style product detail tabs: a horizontal, icon-labeled tab bar
 * with an underline indicator, switching a single content panel below. */
export function ProductDetailTabs({ tabs }: { tabs: ProductDetailTab[] }) {
  const [active, setActive] = useState(0);

  if (tabs.length === 0) return null;
  const activeTab = tabs[Math.min(active, tabs.length - 1)];

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white">
      <div
        role="tablist"
        aria-label="Product details"
        className="scrollbar-hide flex overflow-x-auto border-b border-gray-100"
      >
        {tabs.map((tab, index) => {
          const Icon = getProductTabIcon(tab.title);
          const isActive = index === active;
          return (
            <button
              key={`${tab.title}-${index}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(index)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 whitespace-nowrap px-5 py-4 text-sm font-semibold transition-colors",
                isActive ? "text-ocean-900" : "text-gray-400 hover:text-ocean-700"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-aqua-600" : "text-gray-300")} />
              {tab.title}
              {isActive && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-aqua-500" />}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="p-6 sm:p-8">
        {activeTab.content}
      </div>
    </div>
  );
}
