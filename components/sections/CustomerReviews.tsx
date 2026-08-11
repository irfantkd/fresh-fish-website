import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { CustomerReviewCarousel } from "@/components/sections/CustomerReviewCarousel";
import { getFeaturedReviews } from "@/lib/services/reviews.service";

export async function CustomerReviews() {
  const reviews = await getFeaturedReviews();

  // Only real, admin-approved reviews are shown here — nothing to display
  // (and no fabricated fallback) until customers actually leave some.
  if (reviews.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Customer Reviews"
            title="Loved by Homes Across Dubai"
            align="center"
            className="mx-auto"
          />
        </FadeIn>
        <div className="mt-12">
          <CustomerReviewCarousel reviews={reviews} />
        </div>
      </Container>
    </section>
  );
}
