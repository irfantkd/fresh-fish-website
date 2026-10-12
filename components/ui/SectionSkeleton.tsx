import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";

/**
 * A generic placeholder shown while an async section's data is still being
 * fetched, so Suspense can stream the rest of the page immediately instead
 * of the whole page staying blank until every section (including slow ones
 * deep below the fold) has resolved.
 */
export function SectionSkeleton({
  rows = 4,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("animate-pulse py-20 sm:py-28", className)}>
      <Container>
        <div className="mx-auto h-4 w-32 rounded-full bg-gray-100" />
        <div className="mx-auto mt-4 h-9 w-full max-w-md rounded-full bg-gray-100" />
        <div
          className="mt-10 grid gap-4"
          style={{ gridTemplateColumns: `repeat(${Math.min(rows, 4)}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-gray-100" />
          ))}
        </div>
      </Container>
    </div>
  );
}

/** Dark variant matching the WhyChooseUs/FinalCta navy sections, so the
 * fallback doesn't flash white against a dark-themed section. */
export function DarkSectionSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-ocean-950 py-20 sm:py-28", className)}>
      <Container>
        <div className="mx-auto h-4 w-32 rounded-full bg-white/10" />
        <div className="mx-auto mt-4 h-9 w-full max-w-md rounded-full bg-white/10" />
      </Container>
    </div>
  );
}

/** Matches the hero banner's own height/colors so there's no flash of an
 * unrelated-looking placeholder on the very first thing visitors see. */
export function HeroSkeleton() {
  return (
    <div className="h-125 w-full animate-pulse bg-navy-950 sm:h-140 lg:h-155">
      <Container className="flex h-full items-center">
        <div className="flex max-w-xl flex-col gap-4">
          <div className="h-6 w-56 rounded-full bg-white/10" />
          <div className="h-16 w-full rounded-2xl bg-white/10" />
          <div className="h-12 w-full max-w-md rounded-2xl bg-white/10" />
          <div className="mt-2 h-12 w-64 rounded-full bg-white/10" />
        </div>
      </Container>
    </div>
  );
}
