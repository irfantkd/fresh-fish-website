"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { StarRating } from "@/components/ui/StarRating";
import type { Testimonial } from "@/types";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
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
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex w-[85%] shrink-0 snap-start flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm sm:w-[45%] lg:w-[30%]"
          >
            <Quote className="h-8 w-8 text-aqua-300" />
            <p className="flex-1 text-sm leading-relaxed text-gray-600">
              &ldquo;{t.quote}&rdquo;
            </p>
            <StarRating rating={t.rating} />
            <div className="flex items-center gap-3 pt-2">
              <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gray-100">
                <Image src={t.avatar} alt={t.name} fill sizes="44px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ocean-950">{t.name}</p>
                <p className="text-xs text-gray-400">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous testimonials"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-ocean-800 hover:bg-ocean-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next testimonials"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-ocean-800 hover:bg-ocean-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
