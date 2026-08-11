export const SITE_CONFIG = {
  name: "Fresh Fish Dubai",
  shortName: "Fresh Fish",
  description:
    "Live and fresh fish & seafood, hand-picked and cleaned to your order, delivered to your door in Dubai. Custom orders welcome, 24/7 service.",
  url: "https://www.freshfishdubai.com",
  locale: "en_AE",
  phone: "+971 50 123 4567",
  whatsappNumber: "971501234567",
  email: "hello@freshfishdubai.com",
  address: "Al Quoz Fish Market, Dubai, UAE",
  social: {
    instagram: "https://instagram.com/freshfishdubai",
    facebook: "https://facebook.com/freshfishdubai",
    tiktok: "https://tiktok.com/@freshfishdubai",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { label: "All Seafood", href: "/shop" },
    { label: "Fresh Today", href: "/shop?filter=fresh" },
    { label: "Frozen", href: "/shop?filter=frozen" },
    { label: "Premium Selection", href: "/shop?filter=premium" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Delivery Areas", href: "/delivery-areas" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  help: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Custom Orders", href: "/contact" },
    { label: "WhatsApp Order", href: "/contact" },
  ],
} as const;

export const CATEGORY_SLUGS = [
  "fish",
  "shrimp-prawns",
  "crab",
  "lobster",
  "shellfish",
  "salmon",
] as const;
