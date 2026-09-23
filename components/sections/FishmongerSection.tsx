import { MessageCircle, Star } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE_CONFIG } from "@/constants/site";

const POLICY_LINKS = [
  { label: "Delivery policy", href: "/delivery-policy" },
  { label: "Refund and return policy", href: "/refund-return-policy" },
  { label: "Cancellation policy", href: "/cancellation-policy" },
  { label: "Terms and conditions", href: "/terms-and-conditions" },
];

export function FishmongerSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-3xl text-center">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Team"
            title="Meet the Team Behind Your Order"
            align="center"
            className="mx-auto"
          />
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
            Our fishmongers select, clean and prepare every order at our shop in Waterfront
            Market. Fresh Fish Dubai has served customers since 2020.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/about" variant="outline">
              About Us
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            {POLICY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-500 hover:text-aqua-700 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-14 rounded-3xl border border-gray-100 bg-gray-50/60 p-8">
            <h3 className="font-heading text-lg font-bold text-ocean-950">
              Ordered from us? Tell us how it went.
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Send us a few words on WhatsApp or leave a Google review.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  `${SITE_CONFIG.name} Waterfront Market reviews`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                <Star className="h-4 w-4" /> Leave a Google Review
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
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
