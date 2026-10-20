import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FadeIn } from "@/components/animations/FadeIn";
import { WriteReviewForm } from "@/components/reviews/WriteReviewForm";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: `Write a Review | ${SITE_CONFIG.name}`,
  description: `Share your experience with ${SITE_CONFIG.name} — tell us about your order, delivery, and the quality of your seafood.`,
  alternates: { canonical: "/write-review" },
};

export default function WriteReviewPage() {
  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: "Write a Review", url: "/write-review" }]} />
        <FadeIn>
          <SectionHeading
            eyebrow="We'd Love Your Feedback"
            title="Share Your Experience"
            description="Tell us how we did — your review helps other seafood lovers in Dubai, UAE shop with confidence, and helps us keep getting better."
            className="mt-6 max-w-2xl"
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-10 max-w-2xl">
          <WriteReviewForm />
        </FadeIn>
      </Container>
    </div>
  );
}
