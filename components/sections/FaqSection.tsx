import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getHomepageFaqs } from "@/lib/services/faq.service";

export async function FaqSection() {
  const faqs = await getHomepageFaqs();
  if (faqs.length === 0) return null;

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
        <div className="mt-6 text-center">
          <Link
            href="/faq"
            className="text-sm font-semibold text-aqua-600 hover:text-aqua-700 hover:underline"
          >
            See all FAQs
          </Link>
        </div>
      </Container>
    </section>
  );
}
