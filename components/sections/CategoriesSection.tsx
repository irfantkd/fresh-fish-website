"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { FadeIn } from "@/components/animations/FadeIn";
import { useGetQuery } from "@/store/apiSlice";
import type { Category } from "@/types";

function CategoryQuickCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative aspect-4/5 overflow-hidden rounded-2xl bg-ocean-900 shadow-sm ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-ocean-900/20"
      >
        <SeafoodImage
          src={category.featuredImage.url}
          alt={category.featuredImage.alt || category.name}
          fill
          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
          className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/95 via-navy-950/25 to-transparent" />

        {Boolean(category.subcategoryCount) && (
          <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
            <Layers className="h-2.5 w-2.5" />
            {category.subcategoryCount}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-1.5 p-3.5 sm:p-4">
          <div className="min-w-0">
            <h3 className="truncate font-heading text-sm font-bold text-white sm:text-base">
              {category.name}
            </h3>
            <span className="text-[11px] font-medium text-white/65 sm:text-xs">
              {category.productCount} products
            </span>
          </div>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-aqua-500 group-hover:text-navy-950 sm:h-7 sm:w-7">
            <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

function CategoryCardSkeleton() {
  return <div className="aspect-4/5 animate-pulse rounded-2xl bg-gray-100" />;
}

export function CategoriesSection() {
  const { data, isLoading } = useGetQuery({ path: "/categories" });
  // Only top-level categories in this quick-nav grid — subcategories live one
  // click away on their parent's category page (shown there as pills), and a
  // badge here hints how many a category has.
  const categories = ((data as Category[] | undefined) ?? []).filter((c) => !c.parentId);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Shop by Category"
            title="Every Catch, Perfectly Sorted"
            description="From delicate white fish to indulgent shellfish — explore our full range, sourced daily from trusted waters."
            align="center"
            className="mx-auto"
          />
        </FadeIn>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <CategoryCardSkeleton key={i} />)
            : categories.map((category, i) => (
                <FadeIn key={category.id} delay={i * 0.06}>
                  <CategoryQuickCard category={category} />
                </FadeIn>
              ))}
        </div>
      </Container>
    </section>
  );
}
