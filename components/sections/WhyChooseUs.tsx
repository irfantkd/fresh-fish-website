import { CalendarCheck, Clock, Layers, Scale, Store, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";

const REASONS = [
  {
    icon: Store,
    title: "Serving Dubai since 2020",
    description: "A real shop at Waterfront Market, not just a website.",
  },
  {
    icon: Layers,
    title: "100+ products",
    description: "Fresh and frozen, clearly labelled on every page.",
  },
  {
    icon: Scale,
    title: "Exact weight",
    description: "Every order is precisely weighed and timestamp-verified.",
  },
  {
    icon: CalendarCheck,
    title: "Any cut you want",
    description: "Whole, cleaned, cut or fillet.",
  },
  {
    icon: Truck,
    title: "2-hour express delivery",
    description: "Every area of Dubai, UAE, with delivery to the other emirates.",
  },
  {
    icon: Clock,
    title: "Order 24/7",
    description: "WhatsApp, phone or website. Pay cash on delivery.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-ocean-950 py-20 text-white sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Order Fresh Fish and Seafood From Us"
            align="center"
            className="mx-auto [&_h2]:text-white"
          />
        </FadeIn>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <StaggerItem
              key={reason.title}
              className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition-colors hover:border-aqua-400/40"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-aqua-500/15 text-aqua-300">
                <reason.icon className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-lg font-bold text-white">{reason.title}</h3>
              <p className="text-sm text-white/60">{reason.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
