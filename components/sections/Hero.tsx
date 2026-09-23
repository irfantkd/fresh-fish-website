import { CalendarCheck, MapPin, Snowflake, Timer } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { SITE_CONFIG } from "@/constants/site";

const TRUST_STRIP = [
  { icon: CalendarCheck, label: "Serving Dubai since 2020" },
  { icon: MapPin, label: "Shop at Waterfront Market" },
  { icon: Snowflake, label: "Cold chain at 0 to 4°C" },
  { icon: Timer, label: "Express delivery within 2 hours in Dubai" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="relative z-10 flex flex-col gap-6 text-white">
          <h1 className="text-balance font-heading text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
            Fresh Fish Dubai Providing Seafood Delivery to Your Door in Dubai, UAE
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            Order fresh fish online in Dubai, UAE from 100+ fresh and frozen products. Cleaned
            and cut your way, kept at 0 to 4&deg;C and delivered within 2 hours.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="/shop" variant="aqua" size="lg">
              Shop Fresh Fish
            </Button>
            <Button
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              Order on WhatsApp
            </Button>
          </div>

          <ul className="mt-2 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
            {TRUST_STRIP.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-sm text-white/70">
                <item.icon className="h-4 w-4 shrink-0 text-aqua-300" />
                {item.label}
              </li>
            ))}
          </ul>

          <p className="text-xs text-white/50">
            Order 24/7 by WhatsApp, phone or website. Cash on delivery.
          </p>
        </div>

        <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl lg:aspect-square">
          <SeafoodImage
            src="/assets/images/Header1.jpeg"
            alt="Fresh sea bass on ice for delivery in Dubai, UAE"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
