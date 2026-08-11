"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useRef } from "react";
import { StarRating } from "@/components/ui/StarRating";
import { formatDate } from "@/lib/utils/format";
import type { CustomerReview } from "@/types";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function CustomerReviewCarousel({ reviews }: { reviews: CustomerReview[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex w-[85%] shrink-0 snap-start flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:w-[45%] lg:w-[30%]"
          >
            <Quote className="h-8 w-8 text-aqua-300" />
            <p className="flex-1 text-sm leading-relaxed text-gray-600">
              &ldquo;{review.comment}&rdquo;
            </p>
            <StarRating rating={review.rating} />
            <div className="flex items-center gap-3 pt-2">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-aqua-500/15 font-heading text-sm font-bold text-aqua-700">
                {getInitials(review.customerName)}
              </div>
              <div>
                <p className="text-sm font-semibold text-ocean-950">{review.customerName}</p>
                <p className="text-xs text-gray-400">
                  {review.productName
                    ? `Verified purchase · ${review.productName}`
                    : formatDate(review.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous reviews"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-ocean-800 hover:bg-ocean-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next reviews"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-ocean-800 hover:bg-ocean-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
