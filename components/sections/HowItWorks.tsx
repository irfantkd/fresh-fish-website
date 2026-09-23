import { Hand, MessageCircle, ShoppingCart, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";

const STEPS = [
  {
    icon: ShoppingCart,
    title: "Browse & Select",
    description: "Pick from live and fresh fish & seafood, or tell us exactly what you need.",
  },
  {
    icon: MessageCircle,
    title: "Order Anytime, 24/7",
    description: "Confirm your order on WhatsApp or by call — day or night, we're available.",
  },
  {
    icon: Hand,
    title: "Hand-Picked to Order",
    description: "We hand-pick, clean, and prepare it whole — never pre-cooked, always real.",
  },
  {
    icon: Truck,
    title: "Delivered to Your Door",
    description: "Fresh, hygienic home delivery — exactly what you ordered, nothing else.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="How It Works"
            title="From Our Hands to Your Door"
            align="center"
            className="mx-auto"
          />
        </FadeIn>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <StaggerItem
              key={step.title}
              className="relative flex flex-col items-center gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-8 text-center"
            >
              <span className="absolute right-5 top-5 font-heading text-3xl font-bold text-gray-100">
                0{index + 1}
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-800 text-aqua-300">
                <step.icon className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-lg font-bold text-ocean-950">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
