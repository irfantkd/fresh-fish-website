"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/layout/SearchBar";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { NAV_LINKS, SITE_CONFIG } from "@/constants/site";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totalCount, openDrawer } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 16);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-gray-100 bg-white/85 shadow-sm backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8",
          isScrolled ? "h-16" : "h-20"
        )}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <motion.span
            animate={{ scale: isScrolled ? 0.88 : 1 }}
            transition={{ duration: 0.25 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean-800 font-heading text-lg font-bold text-aqua-300"
          >
            FF
          </motion.span>
          <span className="hidden font-heading text-lg font-bold text-ocean-950 sm:block">
            Fresh Fish <span className="text-aqua-600">Dubai</span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-ocean-900" : "text-gray-600 hover:text-ocean-900"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-ocean-50"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <SearchBar className="relative ml-auto hidden max-w-xs flex-1 md:block" />

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <Button
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </Button>

          <button
            onClick={openDrawer}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ocean-900 hover:bg-ocean-50"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-offer-500 px-1 text-[10px] font-bold text-white">
                {totalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ocean-900 hover:bg-ocean-50 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <ScrollProgressBar />

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xs flex-col gap-6 bg-white p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg font-bold text-ocean-950">Menu</span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <SearchBar className="relative" />

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-ocean-50 hover:text-ocean-900",
                      pathname === link.href && "bg-ocean-50 text-ocean-900"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Button
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="mt-auto w-full"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
