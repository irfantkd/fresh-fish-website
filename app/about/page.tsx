import type { Metadata } from "next";
import { Award, Leaf, ShieldCheck, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Fresh Fish Dubai's mission to deliver premium, sustainably sourced seafood across the UAE.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: Truck, title: "Speed", description: "From dock to doorstep in hours, not days." },
  {
    icon: ShieldCheck,
    title: "Hygiene",
    description: "Every product handled under strict cold-chain standards.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Partnering with fisheries that protect ocean ecosystems.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "Hand-graded seafood that meets restaurant-level standards.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: "About", url: "/about" }]} />

        <FadeIn>
          <SectionHeading
            eyebrow="Our Story"
            title="Bringing the Ocean's Best to Your Table"
            description={`${SITE_CONFIG.name} was founded with a simple mission: make premium, ocean-fresh seafood accessible to every home in the UAE, without compromising on quality or speed.`}
            className="mt-6 max-w-3xl"
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 max-w-3xl space-y-4 text-base leading-relaxed text-gray-600">
          <p>
            We work directly with trusted fisheries and fish farms across the globe — from the
            cold fjords of Norway to the warm waters of the Arabian Gulf — to source seafood that
            meets the highest standards of freshness and sustainability.
          </p>
          <p>
            Every order is hand-inspected, carefully packed in insulated, cold-chain packaging,
            and delivered within hours to ensure it reaches your kitchen exactly as it left the
            water: fresh, safe, and full of flavor.
          </p>
        </FadeIn>

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <StaggerItem
              key={value.title}
              className="flex flex-col items-center gap-3 rounded-3xl border border-gray-100 bg-gray-50/60 p-8 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-800 text-aqua-300">
                <value.icon className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-lg font-bold text-ocean-950">{value.title}</h3>
              <p className="text-sm text-gray-500">{value.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </div>
  );
}
