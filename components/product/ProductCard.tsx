"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { StarRating } from "@/components/ui/StarRating";
import { formatAED, formatWeight } from "@/lib/utils/format";
import { getLowestSize } from "@/lib/utils/product";
import { buildProductInquiryLink } from "@/lib/utils/whatsapp";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const size = getLowestSize(product);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200/70 transition-shadow hover:shadow-xl hover:shadow-ocean-900/10"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Link href={`/product/${product.slug}`} className="relative block h-full w-full">
          <SeafoodImage
            src={product.featuredImage.url}
            alt={product.featuredImage.alt || product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>

        <div className="absolute left-2 top-2 flex max-w-[calc(100%-2.75rem)] flex-col items-start gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
          {product.isFreshToday && (
            <Badge variant="fresh" className="text-[10px] sm:text-xs">
              Live · Fresh Today
            </Badge>
          )}
          {product.isPremium && (
            <Badge variant="premium" className="text-[10px] sm:text-xs">
              Premium
            </Badge>
          )}
          {product.state === "frozen" && (
            <Badge variant="frozen" className="text-[10px] sm:text-xs">
              Frozen (Raw)
            </Badge>
          )}
        </div>

        <button
          type="button"
          onClick={() => setWishlisted((w) => !w)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ocean-800 shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <Heart className={wishlisted ? "h-4 w-4 fill-offer-500 text-offer-500" : "h-4 w-4"} />
        </button>

        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-navy-950/85 py-2.5 text-sm font-semibold text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="h-4 w-4" /> Quick View
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <span className="text-xs font-medium uppercase tracking-wide text-aqua-600">
          {product.origin.country}
        </span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-heading text-base font-bold text-ocean-950 sm:text-lg">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-gray-500">{product.shortDescription}</p>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-heading text-base font-bold text-ocean-900 sm:text-lg">
              {formatAED(size.price)}
            </span>
            <span className="text-xs text-gray-400">/ {formatWeight(size.weightGrams)}</span>
          </div>
          <a
            href={buildProductInquiryLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 shrink-0 items-center justify-center rounded-full bg-fresh-green-500 px-3 text-xs font-semibold text-white shadow-sm shadow-fresh-green-500/30 transition-colors hover:bg-fresh-green-600 sm:h-10 sm:px-4"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
