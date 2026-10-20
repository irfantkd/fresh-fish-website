import { Quote } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { formatDate } from "@/lib/utils/format";
import type { CustomerReview } from "@/types";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function ReviewCard({ review }: { review: CustomerReview }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-aqua-500/15 font-heading text-sm font-bold text-aqua-700">
            {getInitials(review.customerName)}
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-ocean-950">
              {review.customerName}
            </p>
            <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <Quote className="h-6 w-6 shrink-0 text-aqua-200" />
      </div>

      <StarRating rating={review.rating} />

      <p className="flex-1 text-sm leading-relaxed text-gray-600">{review.comment}</p>

      {review.productName && (
        <span className="inline-flex w-fit items-center rounded-full bg-fresh-green-500/10 px-3 py-1 text-xs font-semibold text-fresh-green-600">
          Verified purchase · {review.productName}
        </span>
      )}
    </div>
  );
}
