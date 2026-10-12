"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG } from "@/constants/site";

// Cart and checkout already have their own prominent, better-positioned
// "Order/Checkout via WhatsApp" buttons in the page content — the floating
// bubble there is redundant and, on mobile, sits directly on top of the
// full-width "Proceed to Checkout"/"Place Order" button, overlapping its tap
// target.
const HIDDEN_ON = ["/cart", "/checkout"];

export function WhatsAppFloatingButton() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;

  // Product pages have their own sticky mobile purchase bar (with its own
  // WhatsApp button) in that same bottom-right corner — hide the floating
  // bubble there too, but only on mobile; on desktop the purchase panel is
  // inline, not corner-fixed, so there's no overlap and the bubble still adds
  // value.
  const isProductPage = pathname.startsWith("/product/");

  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group fixed bottom-5 right-5 z-30 h-14 w-14 items-center justify-center rounded-full bg-fresh-green-500 text-white shadow-xl shadow-fresh-green-600/30 transition-transform hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8 ${
        isProductPage ? "hidden sm:flex" : "flex"
      }`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-fresh-green-500/50 group-hover:animate-none" />
      <FaWhatsapp className="relative h-7 w-7" />
    </a>
  );
}
