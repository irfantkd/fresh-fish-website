import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { CustomerReview } from "@/types";

export function ReviewsSummary({ reviews }: { reviews: CustomerReview[] }) {
  const total = reviews.length;
  const average = total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.round(r.rating) === stars).length;
    return { stars, count, percent: total > 0 ? Math.round((count / total) * 100) : 0 };
  });

  return (
    <div className="grid gap-8 rounded-3xl border border-gray-100 bg-gray-50/60 p-8 sm:grid-cols-[auto_1fr] sm:gap-12">
      <div className="flex flex-col items-center justify-center gap-2 text-center sm:items-start sm:text-left">
        <span className="font-heading text-6xl font-bold text-ocean-950">
          {average.toFixed(1)}
        </span>
        <div className="flex" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < Math.round(average)
                  ? "fill-offer-500 text-offer-500"
                  : "fill-gray-200 text-gray-200"
              )}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          Based on {total} {total === 1 ? "review" : "reviews"}
        </span>
      </div>

      <div className="flex flex-col justify-center gap-2">
        {distribution.map(({ stars, count, percent }) => (
          <div key={stars} className="flex items-center gap-3 text-sm">
            <span className="flex w-10 shrink-0 items-center gap-1 font-medium text-gray-500">
              {stars} <Star className="h-3.5 w-3.5 fill-offer-500 text-offer-500" />
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-offer-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-xs text-gray-400">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
