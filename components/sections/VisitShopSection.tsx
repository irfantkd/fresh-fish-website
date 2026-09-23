import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE_CONFIG } from "@/constants/site";

export function VisitShopSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Come Say Hello"
                title="Visit Our Shop at Waterfront Market"
              />
              <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600">
                Fresh Fish Dubai has traded since 2020. Our physical shop is at Waterfront
                Market, Dubai. Visit us to see the day&apos;s fish in person, or order online
                24/7.
              </p>

              <dl className="mt-6 flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex gap-2">
                  <dt className="font-semibold text-ocean-950">Address:</dt>
                  <dd>{SITE_CONFIG.address}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-ocean-950">Phone:</dt>
                  <dd>{SITE_CONFIG.phone}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-ocean-950">WhatsApp:</dt>
                  <dd>{SITE_CONFIG.phone}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={SITE_CONFIG.mapLinkUrl} target="_blank" rel="noopener noreferrer" variant="aqua">
                  Get Directions
                </Button>
                <Button href={`tel:${SITE_CONFIG.phone}`} variant="outline">
                  <Phone className="h-4 w-4" /> Call Us
                </Button>
                <Button
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                >
                  <MessageCircle className="h-4 w-4" /> Order on WhatsApp
                </Button>
              </div>

              <Link
                href="/contact"
                className="mt-4 inline-block text-sm font-semibold text-aqua-700 hover:underline"
              >
                Contact and directions
              </Link>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
              <iframe
                src={SITE_CONFIG.mapEmbedUrl}
                title="Fresh Fish Dubai location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full border-0 sm:h-96"
              />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
