import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getFaqs } from "@/lib/services/faq.service";
import { faqJsonLd } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/constants/site";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${SITE_CONFIG.name}`,
  description:
    "Answers to common questions about ordering, delivery, freshness, and payment at Fresh Fish Dubai.",
  alternates: { canonical: "/faq" },
};

function groupByCategory(faqs: FaqItem[]): [string, FaqItem[]][] {
  const groups = new Map<string, FaqItem[]>();
  for (const faq of faqs) {
    const key = faq.category?.trim() || "General";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(faq);
  }
  return Array.from(groups.entries());
}

export default async function FaqPage() {
  const faqs = await getFaqs();
  const groups = groupByCategory(faqs);
  // Only bother splitting into labeled sections once there's more than one
  // real category — otherwise it's just one flat, unlabeled list.
  const showGroupLabels = groups.length > 1;

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
        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-10">
          {groups.map(([category, items]) => (
            <div key={category}>
              {showGroupLabels && (
                <h2 className="mb-4 font-heading text-lg font-bold text-ocean-950">{category}</h2>
              )}
              <FaqAccordion faqs={items} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
