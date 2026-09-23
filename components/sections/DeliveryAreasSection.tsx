import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { getDeliveryAreas } from "@/lib/services/delivery-areas.service";

export async function DeliveryAreasSection() {
  const areas = await getDeliveryAreas();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Delivery Areas"
              title="Fast Delivery Across Dubai"
              description="Same-day delivery windows across the city. Check your area and estimated delivery time below."
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
    </section>
  );
}
