import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";

// Guide pages aren't published yet — every card links to /blog for now, and
// switches to its own URL once that guide is live.
const GUIDES = [
  "How to tell if fish is fresh",
  "How to store fresh fish at home",
  "Fish names in Arabic and English",
  "Fresh or frozen seafood: which to buy",
  "Hamour or grouper?",
  "Fish cuts explained",
];

export function FishGuidesSection() {
  return (
    <section className="bg-gray-50/60 py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="From Our Fishmongers"
            title="Learn Before You Cook"
            description="Short guides from our fishmongers."
          />
        </FadeIn>

        <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((title) => (
            <StaggerItem key={title}>
              <Link
                href="/blog"
                className="flex h-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 transition-colors hover:border-aqua-300"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aqua-500/10 text-aqua-700">
                  <BookOpen className="h-4.5 w-4.5" />
                </span>
                <span className="font-heading text-sm font-semibold text-ocean-950">{title}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-8 text-center">
          <Button href="/blog" variant="outline">
            Read All Guides
          </Button>
        </div>
      </Container>
    </section>
  );
}
