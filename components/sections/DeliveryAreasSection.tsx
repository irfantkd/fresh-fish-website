import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { getDeliveryAreas } from "@/lib/services/delivery-areas.service";

export async function DeliveryAreasSection() {
  const areas = await getDeliveryAreas();

  return (
    <section className="bg-gray-50/60 py-20 sm:py-28">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Delivery Areas"
              title="Seafood Delivery Dubai, UAE: 2-Hour Express Delivery"
              description="Express delivery reaches every area of Dubai, UAE within 2 hours. We also deliver to the other emirates. We confirm your delivery time on WhatsApp when you order."
            />
            <Button href="/delivery-areas" variant="outline">
              View Full Map
            </Button>
          </div>
        </FadeIn>

        <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {areas.map((area) => (
            <StaggerItem
              key={area.id}
              className="group flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-aqua-200 hover:shadow-lg hover:shadow-ocean-900/5"
            >
              <MapPin className="h-5 w-5 text-aqua-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-heading text-sm font-bold text-ocean-950">
                {area.name}
              </span>
              <span className="text-xs text-gray-400">{area.estimatedTime}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
