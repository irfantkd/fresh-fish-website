"use client";

import { useState } from "react";
import { Check, Link2, Mail, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function BlogShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const emailHref = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — nothing more we can do here
    }
  }

  const buttonClasses =
    "flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-ocean-800 transition-colors hover:border-aqua-300 hover:bg-aqua-50 hover:text-aqua-700";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className={buttonClasses}
      >
        <MessageCircle className="h-4 w-4" />
      </a>
      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className={buttonClasses}
      >
        <Share2 className="h-4 w-4" />
      </a>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={buttonClasses}
      >
        <span className="text-sm font-bold">X</span>
      </a>
      <a href={emailHref} aria-label="Share via email" className={buttonClasses}>
        <Mail className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className={cn(buttonClasses, copied && "border-fresh-green-400 text-fresh-green-600")}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
