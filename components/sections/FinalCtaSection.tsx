import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE_CONFIG } from "@/constants/site";

export function FinalCtaSection() {
  return (
    <section className="bg-ocean-950 py-20 text-white sm:py-28">
      <Container className="max-w-2xl text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Order Fresh Fish Dubai Today
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            100+ fresh and frozen products, cut your way, delivered within 2 hours in Dubai, UAE
            and across the UAE. Order 24/7 and pay cash on delivery.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
              <MessageCircle className="h-4.5 w-4.5" /> Order on WhatsApp
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
