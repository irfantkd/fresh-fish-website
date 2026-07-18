import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getFaqs } from "@/lib/services/faq.service";
import { faqJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about ordering, delivery, freshness, and payment at Fresh Fish Dubai.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: "FAQ", url: "/faq" }]} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
        />
        <SectionHeading
          eyebrow="Support"
          title="Frequently Asked Questions"
          align="center"
          className="mx-auto mt-6"
        />
        <div className="mt-12">
          <FaqAccordion faqs={faqs} />
        </div>
      </Container>
    </div>
  );
}
