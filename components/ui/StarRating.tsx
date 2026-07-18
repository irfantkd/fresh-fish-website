import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function StarRating({
  rating,
  reviewCount,
  className,
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              i < Math.round(rating)
                ? "fill-offer-500 text-offer-500"
                : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-gray-500">
        {rating.toFixed(1)}
        {typeof reviewCount === "number" && ` (${reviewCount})`}
      </span>
    </div>
  );
}
