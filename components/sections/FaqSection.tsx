import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getFaqs } from "@/lib/services/faq.service";

export async function FaqSection() {
  const faqs = await getFaqs();

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            align="center"
            className="mx-auto"
          />
        </FadeIn>
        <div className="mt-12">
          <FaqAccordion faqs={faqs} />
        </div>
      </Container>
    </section>
  );
}
