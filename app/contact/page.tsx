import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Fresh Fish Dubai for orders, questions, or feedback. Reach us via WhatsApp, phone, or email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: "Contact", url: "/contact" }]} />

        <FadeIn>
          <SectionHeading
            eyebrow="Get in Touch"
            title="We'd Love to Hear From You"
            description="Questions about an order, delivery, or a custom request? Reach out and our team will respond quickly."
            className="mt-6 max-w-2xl"
          />
        </FadeIn>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn className="flex flex-col gap-4">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-6 transition-colors hover:border-fresh-green-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fresh-green-500/10 text-fresh-green-600">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-bold text-ocean-950">WhatsApp</p>
                <p className="text-sm text-gray-500">Fastest way to place an order</p>
              </div>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-6 transition-colors hover:border-ocean-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-800/10 text-ocean-700">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-bold text-ocean-950">{SITE_CONFIG.phone}</p>
                <p className="text-sm text-gray-500">Mon-Sun, 9AM - 10PM</p>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-6 transition-colors hover:border-aqua-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua-500/10 text-aqua-700">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-bold text-ocean-950">{SITE_CONFIG.email}</p>
                <p className="text-sm text-gray-500">We reply within 24 hours</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-200/60 text-gray-600">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-bold text-ocean-950">{SITE_CONFIG.address}</p>
                <p className="text-sm text-gray-500">Visit our facility</p>
              </div>
            </div>

            <Button
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="mt-2"
            >
              <MessageCircle className="h-4.5 w-4.5" /> Chat on WhatsApp
            </Button>
          </FadeIn>

          <FadeIn delay={0.1} className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="font-heading text-lg font-bold text-ocean-950">Send a Message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
