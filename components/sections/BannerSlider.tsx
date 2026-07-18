"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { cn } from "@/lib/utils/cn";
import type { Banner } from "@/types";

const AUTOPLAY_SECONDS = 6;

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? "8%" : "-8%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? "-8%" : "8%", opacity: 0 }),
};

export function BannerSlider({ banners }: { banners: Banner[] }) {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      setSlide([((nextIndex % banners.length) + banners.length) % banners.length, dir]);
    },
    [banners.length]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const timer = setInterval(next, AUTOPLAY_SECONDS * 1000);
    return () => clearInterval(timer);
  }, [isPaused, next, banners.length]);

  const banner = banners[index];

  return (
    <section
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured offers"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      className="relative isolate h-125 overflow-hidden bg-navy-950 focus:outline-none sm:h-140 lg:h-155"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={banner.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="absolute inset-0"
        >
          <SeafoodImage
            src={banner.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/70 to-navy-950/20" />
          <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent" />

          <Container className="relative flex h-full items-center">
            <div className="flex max-w-xl flex-col items-start gap-4 text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-aqua-300 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-fresh-green-400" />
                {banner.eyebrow}
              </span>

              <h1 className="text-balance font-heading text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
                {banner.title}
              </h1>

              <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                {banner.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  href={banner.primaryCta.href}
                  target={banner.primaryCta.external ? "_blank" : undefined}
                  rel={banner.primaryCta.external ? "noopener noreferrer" : undefined}
                  variant="aqua"
                  size="lg"
                >
                  {banner.primaryCta.label}
                </Button>
                {banner.secondaryCta && (
                  <Button
                    href={banner.secondaryCta.href}
                    target={banner.secondaryCta.external ? "_blank" : undefined}
                    rel={banner.secondaryCta.external ? "noopener noreferrer" : undefined}
                    variant="outline"
                    size="lg"
                    className="bg-white/10 text-white hover:bg-white/20"
                  >
                    {banner.secondaryCta.label}
                  </Button>
                )}
              </div>
            </div>
          </Container>
        </motion.div>
      </AnimatePresence>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:left-5 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:right-5 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-10">
            {banners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="p-1"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-500",
                    i === index ? "w-6 bg-aqua-300" : "w-1.5 bg-white/30 hover:bg-white/50"
                  )}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
