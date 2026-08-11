"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock, Mail, Menu, MessageCircle, Phone, ShoppingBag, X } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { SearchBar } from "@/components/layout/SearchBar";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { NAV_LINKS, SITE_CONFIG } from "@/constants/site";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils/cn";
import { useGetQuery } from "@/store/apiSlice";
import type { Category } from "@/types";

export function Navbar() {
  const { data: categories } = useGetQuery({ path: "/categories" });
  const categoryList = (categories as Category[]) ?? [];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const { totalCount, openDrawer } = useCart();
  const pathname = usePathname();
  const categoriesRef = useRef<HTMLDivElement>(null);

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
    setIsCategoriesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsCategoriesOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      {/* Utility top bar — scrolls away with the page (not sticky), sits
          above the main nav which stays pinned via its own sticky header. */}
      <div className="hidden bg-navy-950 text-white/70 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-aqua-300"
            >
              <Phone className="h-3.5 w-3.5" /> {SITE_CONFIG.phone}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-aqua-300 md:flex"
            >
              <Mail className="h-3.5 w-3.5" /> {SITE_CONFIG.email}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 text-white/50 lg:flex">
              <Clock className="h-3.5 w-3.5" /> Same-day delivery across Dubai, 24/7
            </span>
            <div className="flex items-center gap-3 border-l border-white/15 pl-4">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-aqua-300"
              >
                <FaInstagram className="h-3.5 w-3.5" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors hover:text-aqua-300"
              >
                <FaFacebook className="h-3.5 w-3.5" />
              </a>
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="transition-colors hover:text-aqua-300"
              >
                <FaTiktok className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

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
          <Link
            href="/"
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
              pathname === "/" ? "text-ocean-900" : "text-gray-600 hover:text-ocean-900"
            )}
          >
            {pathname === "/" && (
              <motion.span
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-full bg-ocean-50"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">Home</span>
          </Link>

          <div ref={categoriesRef} className="relative">
            <button
              type="button"
              onClick={() => setIsCategoriesOpen((open) => !open)}
              aria-expanded={isCategoriesOpen}
              aria-haspopup="true"
              className={cn(
                "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname.startsWith("/categor")
                  ? "text-ocean-900"
                  : "text-gray-600 hover:text-ocean-900"
              )}
            >
              {pathname.startsWith("/categor") && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-ocean-50"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">Categories</span>
              <ChevronDown
                className={cn(
                  "relative h-3.5 w-3.5 transition-transform",
                  isCategoriesOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {isCategoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-40 mt-2 w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {categoryList.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="flex items-center gap-3 rounded-xl p-2 hover:bg-ocean-50"
                      >
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <SeafoodImage
                            src={category.featuredImage.url}
                            alt={category.featuredImage.alt || category.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ocean-950">
                            {category.name}
                          </p>
                          <p className="text-xs text-gray-400">{category.productCount} items</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/categories"
                    className="mt-2 flex items-center justify-center rounded-xl border-t border-gray-100 pt-3 text-sm font-semibold text-aqua-600 hover:text-aqua-700"
                  >
                    View All Categories
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.filter((link) => link.href !== "/").map((link) => {
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
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xs flex-col gap-6 overflow-y-auto bg-white p-6 shadow-2xl lg:hidden"
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
                <Link
                  href="/"
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-ocean-50 hover:text-ocean-900",
                    pathname === "/" && "bg-ocean-50 text-ocean-900"
                  )}
                >
                  Home
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileCategoriesOpen((open) => !open)}
                  aria-expanded={isMobileCategoriesOpen}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-ocean-50 hover:text-ocean-900",
                    pathname.startsWith("/categor") && "bg-ocean-50 text-ocean-900"
                  )}
                >
                  Categories
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isMobileCategoriesOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {isMobileCategoriesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-2"
                    >
                      <div className="flex flex-col gap-1 py-1">
                        {categoryList.map((category) => (
                          <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="rounded-xl px-4 py-2 text-sm text-gray-500 hover:bg-ocean-50 hover:text-ocean-900"
                          >
                            {category.name}
                          </Link>
                        ))}
                        <Link
                          href="/categories"
                          className="rounded-xl px-4 py-2 text-sm font-semibold text-aqua-600 hover:text-aqua-700"
                        >
                          View All Categories
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
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
    </>
  );
}
