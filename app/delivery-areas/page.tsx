import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { getDeliveryAreas } from "@/lib/services/delivery-areas.service";
import { DELIVERY, DELIVERY_TIERS, SITE_CONFIG } from "@/constants/site";
import { formatAED } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: `Delivery Areas | ${SITE_CONFIG.name}`,
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
        <p className="mt-4 max-w-2xl rounded-2xl bg-aqua-50 px-5 py-3 text-sm text-ocean-800">
          {DELIVERY.note}
        </p>

        <div className="mt-6 max-w-2xl rounded-2xl border border-gray-100 p-5">
          <h2 className="font-heading text-sm font-bold text-ocean-950">
            Delivery Fee by Distance
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm">
            {DELIVERY_TIERS.map((tier, i) => (
              <li key={tier.upToKm} className="flex items-center justify-between text-gray-500">
                <span>
                  {i === 0 ? "Up to" : `${DELIVERY_TIERS[i - 1].upToKm}km –`} {tier.upToKm}km
                </span>
                <span className="font-semibold text-ocean-900">{formatAED(tier.fee)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-400">
            Distances are measured from our shop. Share a pin at checkout for an exact quote, or
            we&apos;ll confirm it with you on WhatsApp.
          </p>
        </div>

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
