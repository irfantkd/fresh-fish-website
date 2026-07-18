import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { getDeliveryAreas } from "@/lib/services/delivery-areas.service";

export const metadata: Metadata = {
  title: "Delivery Areas",
  description:
    "Check which Dubai neighborhoods Fresh Fish Dubai delivers to and estimated delivery times.",
  alternates: { canonical: "/delivery-areas" },
};

export default async function DeliveryAreasPage() {
  const areas = await getDeliveryAreas();

  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: "Delivery Areas", url: "/delivery-areas" }]} />
        <SectionHeading
          eyebrow="Delivery"
          title="Where We Deliver"
          description="We currently deliver across the following Dubai areas. Don't see yours? Message us on WhatsApp to check availability."
          className="mt-6 max-w-2xl"
        />
        <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {areas.map((area) => (
            <StaggerItem
              key={area.id}
              className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50/60 p-5"
            >
              <MapPin className="h-5 w-5 text-aqua-600" />
              <span className="font-heading text-sm font-bold text-ocean-950">
                {area.name}
              </span>
              <span className="text-xs text-gray-400">{area.estimatedTime}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </div>
  );
}
