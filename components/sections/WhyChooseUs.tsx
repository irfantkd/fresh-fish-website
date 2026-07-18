import { Clock, Hand, SlidersHorizontal, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";

const REASONS = [
  {
    icon: Hand,
    title: "Live & Hand-Picked",
    description: "Never cooked, never pre-packed — we hand-pick and clean it whole, just for you.",
  },
  {
    icon: SlidersHorizontal,
    title: "Custom Orders, Anytime",
    description: "Tell us the size, cut, or quantity you need — we'll prepare it exactly that way.",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Order by WhatsApp or call any time, day or night — we're always available.",
  },
  {
    icon: Truck,
    title: "Reliable Home Delivery",
    description: "Hygienic, cold-chain delivery straight to your door across Dubai.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-ocean-950 py-20 text-white sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Trusted by Seafood Lovers Across Dubai"
            align="center"
            className="mx-auto [&_h2]:text-white"
          />
        </FadeIn>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
