"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Clock,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Package,
  Phone,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { SearchBar } from "@/components/layout/SearchBar";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { NAV_LINKS, SITE_CONFIG } from "@/constants/site";
import { useCart } from "@/hooks/useCart";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format";
import { useGetQuery } from "@/store/apiSlice";
import type { BlogPost, Category } from "@/types";
import horizontalLogo from "@/public/assets/images/Horizontal_logo_Fresh_Fish_Dubai-removebg-preview.png";

interface BlogsResponse {
  items: BlogPost[];
  total: number;
  page: number;
  limit: number;
}

const MEGA_MENU_CATEGORY_LIMIT = 6;

export function Navbar() {
  const { data: categories } = useGetQuery({ path: "/categories" });
  // Only top-level categories in the nav — subcategories live on their
  // parent's category page, not in this quick-access menu.
  const categoryList = ((categories as Category[]) ?? []).filter((c) => !c.parentId);
  const { data: blogsData } = useGetQuery({
    path: "/blogs",
    params: { status: "published", sort: "newest", limit: 3 },
  });
  const recentPosts = (blogsData as BlogsResponse | undefined)?.items ?? [];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { totalCount, openDrawer } = useCart();
  const { isAuthenticated, customer, logout } = useCustomerAuth();
  const pathname = usePathname();
  const categoriesRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const categoriesCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blogCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setIsBlogOpen(false);
    setIsAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setIsCategoriesOpen(false);
      }
      if (blogRef.current && !blogRef.current.contains(event.target as Node)) {
        setIsBlogOpen(false);
      }
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsAccountOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsCategoriesOpen(false);
        setIsBlogOpen(false);
        setIsAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Hover-open with a short close delay — moving the mouse from the trigger
  // to the panel below briefly leaves both elements' bounds, and without a
  // delay that gap would flicker the menu shut before the mouse arrives.
  function openCategoriesMenu() {
    if (categoriesCloseTimeout.current) clearTimeout(categoriesCloseTimeout.current);
    setIsCategoriesOpen(true);
  }
  function closeCategoriesMenu() {
    categoriesCloseTimeout.current = setTimeout(() => setIsCategoriesOpen(false), 200);
  }
  function openBlogMenu() {
    if (blogCloseTimeout.current) clearTimeout(blogCloseTimeout.current);
    setIsBlogOpen(true);
  }
  function closeBlogMenu() {
    blogCloseTimeout.current = setTimeout(() => setIsBlogOpen(false), 200);
  }

  useEffect(() => {
    return () => {
      if (categoriesCloseTimeout.current) clearTimeout(categoriesCloseTimeout.current);
      if (blogCloseTimeout.current) clearTimeout(blogCloseTimeout.current);
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
              <Clock className="h-3.5 w-3.5" /> Same-day delivery across Dubai,
              24/7
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
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8",
            isScrolled ? "h-16" : "h-20",
          )}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <motion.div
              animate={{ scale: isScrolled ? 0.9 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={horizontalLogo}
                alt="Fresh Fish Dubai"
                priority
                className="h-9 w-auto sm:h-10"
              />
            </motion.div>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname === "/"
                  ? "text-ocean-900"
                  : "text-gray-600 hover:text-ocean-900",
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

            <div
              ref={categoriesRef}
              className="relative"
              onMouseEnter={openCategoriesMenu}
              onMouseLeave={closeCategoriesMenu}
            >
              <button
                type="button"
                onClick={() => setIsCategoriesOpen((open) => !open)}
                aria-expanded={isCategoriesOpen}
                aria-haspopup="true"
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith("/categor")
                    ? "text-ocean-900"
                    : "text-gray-600 hover:text-ocean-900",
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
                    isCategoriesOpen && "rotate-180",
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
                    className="absolute left-1/2 top-full z-40 mt-3 w-160 -translate-x-1/2 rounded-3xl border border-gray-100 bg-white p-5 shadow-2xl"
                  >
                    <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Shop by Category
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {categoryList.slice(0, MEGA_MENU_CATEGORY_LIMIT).map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 transition-all hover:border-aqua-200 hover:shadow-lg"
                        >
                          <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
                            <SeafoodImage
                              src={category.featuredImage.url}
                              alt={category.featuredImage.alt || category.name}
                              fill
                              sizes="200px"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-3">
                            <p className="truncate text-sm font-semibold text-ocean-950">
                              {category.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {category.productCount} items
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/categories"
                      className="mt-4 flex items-center justify-center rounded-xl border-t border-gray-100 pt-4 text-sm font-semibold text-aqua-600 hover:text-aqua-700"
                    >
                      View All Categories
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              ref={blogRef}
              className="relative"
              onMouseEnter={openBlogMenu}
              onMouseLeave={closeBlogMenu}
            >
              <Link
                href="/blog"
                onClick={() => setIsBlogOpen(false)}
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith("/blog")
                    ? "text-ocean-900"
                    : "text-gray-600 hover:text-ocean-900",
                )}
              >
                {pathname.startsWith("/blog") && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-ocean-50"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">Blog</span>
                <ChevronDown
                  className={cn(
                    "relative h-3.5 w-3.5 transition-transform",
                    isBlogOpen && "rotate-180",
                  )}
                />
              </Link>

              <AnimatePresence>
                {isBlogOpen && recentPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 top-full z-40 mt-3 w-160 -translate-x-1/2 rounded-3xl border border-gray-100 bg-white p-5 shadow-2xl"
                  >
                    <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      From the Blog
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {recentPosts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 transition-all hover:border-aqua-200 hover:shadow-lg"
                        >
                          <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
                            <SeafoodImage
                              src={post.featuredImage?.url ?? ""}
                              alt={post.featuredImage?.alt || post.title}
                              fill
                              sizes="200px"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-3">
                            <p className="line-clamp-2 text-sm font-semibold text-ocean-950">
                              {post.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatDate(post.publishDate)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/blog"
                      className="mt-4 flex items-center justify-center rounded-xl border-t border-gray-100 pt-4 text-sm font-semibold text-aqua-600 hover:text-aqua-700"
                    >
                      View All Posts
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.filter((link) => link.href !== "/" && link.href !== "/blog").map(
              (link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-ocean-900"
                        : "text-gray-600 hover:text-ocean-900",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-ocean-50"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              },
            )}
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

            {isAuthenticated ? (
              <div ref={accountRef} className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setIsAccountOpen((open) => !open)}
                  aria-expanded={isAccountOpen}
                  aria-haspopup="true"
                  aria-label="My account"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ocean-900 hover:bg-ocean-50"
                >
                  <User className="h-5 w-5" />
                </button>
                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full z-40 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl"
                    >
                      {customer && (
                        <div className="px-3 py-2">
                          <p className="truncate text-sm font-semibold text-ocean-950">
                            {customer.name}
                          </p>
                          <p className="truncate text-xs text-gray-400">
                            {customer.email}
                          </p>
                        </div>
                      )}
                      <div className="my-1 border-t border-gray-100" />
                      <Link
                        href="/account"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ocean-950 hover:bg-ocean-50"
                      >
                        <User className="h-4 w-4" /> My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ocean-950 hover:bg-ocean-50"
                      >
                        <Package className="h-4 w-4" /> My Orders
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsAccountOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" /> Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/account/login"
                className="hidden h-10 items-center rounded-full px-3.5 text-sm font-medium text-ocean-900 hover:bg-ocean-50 sm:flex"
              >
                Log In
              </Link>
            )}

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
                  <span className="font-heading text-lg font-bold text-ocean-950">
                    Menu
                  </span>
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
                      pathname === "/" && "bg-ocean-50 text-ocean-900",
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
                      pathname.startsWith("/categor") &&
                        "bg-ocean-50 text-ocean-900",
                    )}
                  >
                    Categories
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isMobileCategoriesOpen && "rotate-180",
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
                        pathname === link.href && "bg-ocean-50 text-ocean-900",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="my-1 border-t border-gray-100" />

                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/account"
                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-ocean-50 hover:text-ocean-900"
                      >
                        <User className="h-4 w-4" /> My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-ocean-50 hover:text-ocean-900"
                      >
                        <Package className="h-4 w-4" /> My Orders
                      </Link>
                      <button
                        type="button"
                        onClick={() => logout()}
                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" /> Log Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/account/login"
                      className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-ocean-50 hover:text-ocean-900"
                    >
                      <User className="h-4 w-4" /> Log In / Register
                    </Link>
                  )}
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
