import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-fresh-green-500 text-white shadow-xl shadow-fresh-green-600/30 transition-transform hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-fresh-green-500/50 group-hover:animate-none" />
      <MessageCircle className="relative h-6 w-6" />
    </a>
  );
}
