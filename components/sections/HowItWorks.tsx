import { Hand, MessageCircle, ShoppingCart, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";

const STEPS = [
  {
    icon: ShoppingCart,
    title: "Browse",
    description: "Pick fresh or frozen fish and seafood.",
  },
  {
    icon: MessageCircle,
    title: "Order",
    description: "Check out on WhatsApp, or message or call us.",
  },
  {
    icon: Hand,
    title: "We prepare",
    description: "Your fish is weighed, then cleaned and cut as you asked.",
  },
  {
    icon: Truck,
    title: "We deliver",
    description: "It arrives cold, within 2 hours in Dubai.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="How It Works"
            title="How to Order Fresh Fish Online in Dubai, UAE"
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

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-sm text-gray-500">Pay cash on delivery.</p>
          <Button href="/shop" variant="aqua" size="lg">
            Start Your Order
          </Button>
        </div>
      </Container>
    </section>
  );
}
