import { Fish, Scale, Snowflake, Timer, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";

const STEPS = [
  {
    icon: Fish,
    title: "Sourced daily",
    description: "Fresh catch comes in every day.",
  },
  {
    icon: Scale,
    title: "Weighed precisely",
    description: "You get the weight you ordered.",
  },
  {
    icon: UtensilsCrossed,
    title: "Cleaned and cut",
    description: "Prepared as you asked.",
  },
  {
    icon: Timer,
    title: "Timestamp-verified",
    description: "Each order is logged so freshness can be checked.",
  },
  {
    icon: Snowflake,
    title: "Delivered cold",
    description: "Insulated, leak-proof coolers with ice packs, at 0 to 4°C, within 2 hours in Dubai.",
  },
];

export function SourcingSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Our Process"
            title="Sourced Daily. Kept at 0 to 4°C. Delivered Within 2 Hours."
            description="We source our catch every day and keep it in a temperature-controlled cold chain from our shop to your door."
          />
        </FadeIn>

        <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, index) => (
            <StaggerItem
              key={step.title}
              className="relative flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-6"
            >
              <span className="absolute right-4 top-4 font-heading text-2xl font-bold text-gray-200">
                0{index + 1}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-800 text-aqua-300">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-base font-bold text-ocean-950">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-8 text-sm text-gray-500">
          Cold chain guaranteed. See our{" "}
          <Link href="/refund-return-policy" className="font-semibold text-aqua-700 hover:underline">
            refund and return policy
          </Link>{" "}
          for what we do if an order does not meet our standard.
        </p>
      </Container>
    </section>
  );
}
