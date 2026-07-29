"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useGetQuery, usePostMutation } from "@/store/apiSlice";
import { formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsResponse {
  items: Review[];
  total: number;
  page: number;
  limit: number;
}

const emptyForm = { customerName: "", customerEmail: "", rating: 5, comment: "" };

export function ProductReviews({ productId }: { productId: string }) {
  const { data, isLoading } = useGetQuery({
    path: "/reviews",
    params: { productId, status: "approved" },
  });
  const reviews = (data as ReviewsResponse | undefined)?.items ?? [];

  const [postReview, { isLoading: isSubmitting }] = usePostMutation();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      await postReview({ path: "/reviews", body: { productId, ...form } }).unwrap();
      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError?.data?.message ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-24 w-full animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-gray-400">
          No reviews yet — be the first to share your experience.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100 rounded-3xl border border-gray-100 bg-white">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-2 p-6">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-ocean-950">
                  {review.customerName}
                </span>
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < review.rating ? "fill-offer-500 text-offer-500" : "text-gray-200"
                      )}
                    />
                  ))}
                </span>
              </div>
              <p className="text-sm text-gray-500">{review.comment}</p>
              <span className="text-xs text-gray-300">{formatDate(review.createdAt)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-6">
        <h3 className="font-heading text-base font-bold text-ocean-950">Leave a Review</h3>
        {submitted ? (
          <p className="mt-2 text-sm text-fresh-green-600">
            Thanks! Your review has been submitted and will appear once approved.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Your name"
                aria-label="Your name"
                value={form.customerName}
                onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                className="h-11 rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email address (optional)"
                aria-label="Email address"
                value={form.customerEmail}
                onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))}
                className="h-11 rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const value = i + 1;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, rating: value }))}
                    aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        value <= form.rating ? "fill-offer-500 text-offer-500" : "text-gray-200"
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <textarea
              required
              rows={3}
              placeholder="Share your experience..."
              aria-label="Your review"
              value={form.comment}
              onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aqua-400 focus:outline-none"
            />
            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="self-start rounded-full bg-ocean-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ocean-600 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
