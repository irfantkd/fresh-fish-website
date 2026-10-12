import type { Metadata } from "next";
import Image from "next/image";
import { ShoppingBag, ShoppingCart, CreditCard, Truck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: `How to Order Fresh Fish Online | ${SITE_CONFIG.name}`,
  description:
    "A step-by-step guide to ordering fresh and frozen seafood online from Fresh Fish Dubai — browse, choose your cut, checkout, and get it delivered within 2 hours.",
  alternates: { canonical: "/how-to-order" },
};

const STEPS = [
  {
    icon: ShoppingBag,
    title: "1. Browse Our Shop",
    description:
      "Explore our full range of fresh and frozen seafood. Filter by category, freshness, or price to find exactly what you need — or search for something specific.",
    image: "/assets/images/how-to-order/step1-browse.png",
    alt: "Browsing the Fresh Fish Dubai shop page with category and freshness filters",
  },
  {
    icon: ShoppingCart,
    title: "2. Choose Your Cut and Size",
    description:
      "On each product page, pick the size or weight you want. Add it to your cart, or order it directly on WhatsApp if you'd rather chat with us about it.",
    image: "/assets/images/how-to-order/step2-product.png",
    alt: "A product page showing size selection and the Add to Cart button",
  },
  {
    icon: ShoppingCart,
    title: "3. Review Your Cart",
    description:
      "Check your order in the cart — adjust quantities, remove anything you've changed your mind about, and see your running total before you check out.",
    image: "/assets/images/how-to-order/step3-cart.png",
    alt: "The shopping cart showing an added item, quantity controls, and total",
  },
  {
    icon: CreditCard,
    title: "4. Complete Checkout",
    description:
      "Enter your delivery details and choose how you'd like to pay — cash on delivery, or bank transfer with a quick receipt upload. No account required; you can check out as a guest.",
    image: "/assets/images/how-to-order/step4-checkout.png",
    alt: "The checkout page with delivery details form and payment method selection",
  },
  {
    icon: Truck,
    title: "5. Receive Your Order",
    description:
      "We weigh, clean, and cut your order exactly as requested, then get it to you within 2 hours in Dubai, kept cold the entire way.",
    image: "/assets/images/how-to-order/step5-confirmation.png",
    alt: "An order confirmation screen showing the order number and total",
  },
];

export default function HowToOrderPage() {
  return (
    <div className="py-12">
      <Container>
        <Breadcrumb items={[{ name: "How to Order", url: "/how-to-order" }]} />

        <FadeIn>
          <SectionHeading
            as="h1"
            eyebrow="A Quick Guide"
            title="How to Order Fresh Fish Online in Dubai, UAE"
            description="Five simple steps from browsing to your door — real screenshots from our own website, so you know exactly what to expect."
            align="center"
            className="mx-auto mt-6 max-w-2xl"
          />
        </FadeIn>

        <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-16 sm:gap-20">
          {STEPS.map((step, i) => (
            <FadeIn
              key={step.title}
              delay={i * 0.05}
              className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-12 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full flex-1">
                <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-lg shadow-ocean-900/5">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={1280}
                    height={800}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full flex-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua-500/10 text-aqua-700">
                  <step.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-heading text-2xl font-bold text-ocean-950 sm:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-gray-600">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mx-auto mt-20 max-w-2xl rounded-3xl border border-gray-100 bg-gray-50/60 p-8 text-center">
          <FaWhatsapp className="mx-auto h-8 w-8 text-fresh-green-500" />
          <h2 className="mt-3 font-heading text-xl font-bold text-ocean-950">
            Prefer to Order on WhatsApp?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Every product and the cart both have a direct &ldquo;Order on WhatsApp&rdquo; option
            — message us your order and delivery details, and we&apos;ll confirm everything right
            there in the chat. Available 24/7.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button href="/shop" variant="aqua" size="lg">
              Start Shopping
            </Button>
            <Button
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <FaWhatsapp className="h-4.5 w-4.5" /> Order on WhatsApp
            </Button>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
