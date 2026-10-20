"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePostMutation } from "@/store/apiSlice";
import { cn } from "@/lib/utils/cn";

const emptyForm = { customerName: "", customerEmail: "", rating: 5, comment: "" };

const inputClasses =
  "h-12 w-full rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none";

// General "how was your experience with us" review — no productId, unlike
// ProductReviews.tsx's form which is hard-wired to one product. This is the
// form a shareable link (e.g. sent to a customer on WhatsApp after
// delivery) points to.
export function WriteReviewForm() {
  const [postReview, { isLoading: isSubmitting }] = usePostMutation();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      await postReview({ path: "/reviews", body: form }).unwrap();
      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError?.data?.message ?? "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-gray-100 bg-gray-50/60 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-fresh-green-500" />
        <h2 className="font-heading text-xl font-bold text-ocean-950">Thank You!</h2>
        <p className="max-w-md text-sm text-gray-500">
          Your review has been submitted and will appear on our reviews page once our team
          approves it. We really appreciate you taking the time to share your experience.
        </p>
        <Button href="/" variant="outline" className="mt-2">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="customerName" className="mb-1.5 block text-sm font-semibold text-ocean-950">
            Your Name
          </label>
          <input
            id="customerName"
            required
            placeholder="e.g. Sarah Al Maktoum"
            value={form.customerName}
            onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="customerEmail" className="mb-1.5 block text-sm font-semibold text-ocean-950">
            Email <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            id="customerEmail"
            type="email"
            placeholder="you@example.com"
            value={form.customerEmail}
            onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-semibold text-ocean-950">Your Rating</span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setForm((f) => ({ ...f, rating: value }))}
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-8 w-8",
                    value <= form.rating ? "fill-offer-500 text-offer-500" : "text-gray-200"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="mb-1.5 block text-sm font-semibold text-ocean-950">
          Your Review
        </label>
        <textarea
          id="comment"
          required
          rows={5}
          placeholder="Tell us about your order, the delivery, and the quality of the seafood..."
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          className={cn(inputClasses, "h-auto resize-none py-3")}
        />
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <Button type="submit" variant="aqua" size="lg" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
