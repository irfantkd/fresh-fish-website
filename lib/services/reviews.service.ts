import { apiGet } from "@/lib/api-client";
import type { CustomerReview } from "@/types";

interface ReviewsResponse {
  items: CustomerReview[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Real, admin-approved customer reviews — the same Review documents shown
 * and moderated in the dashboard — for showcasing on the homepage. Never
 * fabricated/mock data.
 */
export async function getFeaturedReviews(limit = 9): Promise<CustomerReview[]> {
  const res = await apiGet<ReviewsResponse>(
    "/reviews",
    { status: "approved", limit: 30 },
    120
  );
  return [...res.items].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

/** Approved reviews for a single product's Reviews tab — fetched server-side
 * so the review content is present in the page's initial HTML/source. */
export async function getProductReviews(productId: string): Promise<CustomerReview[]> {
  const res = await apiGet<ReviewsResponse>("/reviews", {
    productId,
    status: "approved",
    limit: 50,
  });
  return res.items;
}

/** Every approved review, newest first — for the public /customer-reviews
 * page. A generous limit rather than real pagination: simplest thing that
 * works while the catalog of reviews is this size; revisit if it ever grows
 * past a few hundred. */
export async function getAllReviews(limit = 200): Promise<CustomerReview[]> {
  const res = await apiGet<ReviewsResponse>(
    "/reviews",
    { status: "approved", limit },
    300
  );
  return res.items;
}
