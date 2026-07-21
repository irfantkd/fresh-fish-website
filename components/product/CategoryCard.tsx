"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { ParallaxScroll } from "@/components/animations/ParallaxScroll";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative flex aspect-4/5 overflow-hidden rounded-3xl bg-ocean-900 shadow-sm ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-ocean-900/25"
      >
        <ParallaxScroll speed={0.18} className="absolute -inset-y-8 inset-x-0">
          <SeafoodImage
            src={category.featuredImage.url}
            alt={category.featuredImage.alt || category.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </ParallaxScroll>
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/95 via-navy-950/40 to-transparent" />

        <div className="relative mt-auto flex w-full flex-col gap-2 p-6 sm:p-7">
          <span className="text-xs font-semibold uppercase tracking-widest text-aqua-300">
            {category.productCount} products
          </span>
          <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
            {category.name}
          </h3>
          <p className="line-clamp-2 text-sm text-white/65">{category.description}</p>

          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-white">
            Shop {category.name}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-aqua-500 group-hover:text-navy-950">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
