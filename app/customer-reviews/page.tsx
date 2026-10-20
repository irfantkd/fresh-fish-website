import type { Metadata } from "next";
import { MessageSquareText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { ReviewsSummary } from "@/components/reviews/ReviewsSummary";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { getAllReviews } from "@/lib/services/reviews.service";
import { customerReviewsJsonLd } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: `What Our Customers Say | ${SITE_CONFIG.name}`,
  description: `Real, verified reviews from ${SITE_CONFIG.name} customers across Dubai, UAE — see what they say about our fresh seafood, delivery speed, and service.`,
  alternates: { canonical: "/customer-reviews" },
};

export default async function CustomerReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <div className="py-12">
      <Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(customerReviewsJsonLd(reviews)) }}
        />

        <Breadcrumb items={[{ name: "Customer Reviews", url: "/customer-reviews" }]} />

        <div className="mt-6 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <FadeIn>
            <SectionHeading
              eyebrow="Customer Reviews"
              title="What Our Customers Say"
              description="Real feedback from real customers across Dubai and the UAE — every review here is from a verified submission, reviewed by our team before it's published."
              className="max-w-2xl"
            />
          </FadeIn>
          <Button href="/write-review" variant="aqua" size="lg" className="shrink-0">
            <MessageSquareText className="h-4.5 w-4.5" /> Write a Review
          </Button>
        </div>

        {reviews.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-gray-200 py-20 text-center text-gray-400">
            <MessageSquareText className="h-10 w-10" />
            <p>No reviews yet — be the first to share your experience.</p>
            <Button href="/write-review" variant="outline">
              Write a Review
            </Button>
          </div>
        ) : (
          <>
            <FadeIn delay={0.1} className="mt-12" amount="some">
              <ReviewsSummary reviews={reviews} />
            </FadeIn>

            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <StaggerItem key={review.id}>
                  <ReviewCard review={review} />
                </StaggerItem>
              ))}
            </Stagger>
          </>
        )}
      </Container>
    </div>
  );
}
