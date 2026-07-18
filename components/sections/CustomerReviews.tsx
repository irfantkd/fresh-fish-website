import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { getTestimonials } from "@/lib/services/testimonials.service";

export async function CustomerReviews() {
  const testimonials = await getTestimonials();

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
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </Container>
    </section>
  );
}
