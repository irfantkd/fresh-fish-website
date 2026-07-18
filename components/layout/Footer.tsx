import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { FOOTER_LINKS, SITE_CONFIG } from "@/constants/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/80">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-aqua-400/40 to-transparent"
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-aqua-500/20 font-heading text-lg font-bold text-aqua-300">
              FF
            </span>
            <span className="font-heading text-lg font-bold text-white">
              Fresh Fish Dubai
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            {SITE_CONFIG.description}
          </p>
          <NewsletterForm className="mt-2" />
          <div className="flex items-center gap-3 pt-2">
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-aqua-500/20 hover:text-aqua-300"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-aqua-500/20 hover:text-aqua-300"
            >
              <FaFacebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <FooterColumn title="Shop" links={FOOTER_LINKS.shop} />
        <FooterColumn title="Company" links={FOOTER_LINKS.company} />

        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            Get in Touch
          </h3>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-aqua-300"
          >
            <Phone className="h-4 w-4 shrink-0" /> {SITE_CONFIG.phone}
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-aqua-300"
          >
            <Mail className="h-4 w-4 shrink-0" /> {SITE_CONFIG.email}
          </a>
          <span className="flex items-start gap-2 text-sm text-white/60">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {SITE_CONFIG.address}
          </span>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p>Crafted with care for seafood lovers in the UAE.</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-white/60 transition-colors hover:text-aqua-300"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
