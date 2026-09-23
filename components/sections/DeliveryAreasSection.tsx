import { MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { getDeliveryAreas } from "@/lib/services/delivery-areas.service";
import { OTHER_EMIRATES } from "@/lib/data/delivery-areas.data";
import { SITE_CONFIG } from "@/constants/site";

export async function DeliveryAreasSection() {
  const areas = await getDeliveryAreas();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Delivery Areas"
              title="Seafood Delivery Dubai, UAE: 2-Hour Express and Delivery Across the UAE"
              description="Express delivery reaches every area of Dubai, UAE within 2 hours. We also deliver to the other emirates. We confirm your delivery time on WhatsApp when you order."
            />
            <Button href="/delivery-areas" variant="outline" className="shrink-0">
              Check Your Area
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
              <span className="font-heading text-sm font-bold text-ocean-950">{area.name}</span>
              <span className="text-xs text-gray-400">{area.estimatedTime}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 overflow-hidden rounded-3xl border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50/60 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Where</th>
                <th className="px-5 py-3 font-semibold">Delivery time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-5 py-3 font-semibold text-ocean-950">Dubai (all areas)</td>
                <td className="px-5 py-3 text-gray-500">Express, within 2 hours</td>
              </tr>
              {OTHER_EMIRATES.map((emirate) => (
                <tr key={emirate}>
                  <td className="px-5 py-3 font-semibold text-ocean-950">{emirate}</td>
                  <td className="px-5 py-3 text-gray-500">Time confirmed when you order</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Cash on delivery available. Area not listed? Message us on WhatsApp.
          </p>
          <Button
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
          >
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
