export const SITE_CONFIG = {
  name: "Fresh Fish Dubai",
  shortName: "Fresh Fish",
  description:
    "Live and fresh fish & seafood, hand-picked and cleaned to your order, delivered to your door in Dubai. Custom orders welcome, 24/7 service.",
  url: "https://freshfishdubai.com",
  locale: "en_AE",
  phone: "+971 52 359 9567",
  whatsappNumber: "971523599567",
  email: "info@freshfishdubai.com",
  address: "1st Floor Shop No 285, Waterfront Market, Dubai, UAE",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Waterfront+Market+Dubai+UAE&output=embed",
  mapLinkUrl: "https://www.google.com/maps?q=Waterfront+Market+Dubai+UAE",
  social: {
    instagram: "https://instagram.com/freshfishdubai",
    facebook: "https://facebook.com/freshfishdubai",
    tiktok: "https://tiktok.com/@freshfishdubai",
  },
} as const;

// Shown to customers on the Bank Transfer step of checkout. Hardcoded here
// (not editable from the dashboard/backend) — update these values directly
// when the account details change.
export const BANK_TRANSFER_DETAILS = {
  bankName: "",
  accountName: "",
  accountNumber: "",
  iban: "",
  swiftCode: "",
  branch: "",
  notes: "",
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

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund & Return Policy", href: "/refund-return-policy" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
  { label: "Delivery Policy", href: "/delivery-policy" },
] as const;

export const CATEGORY_SLUGS = [
  "fish",
  "shrimp-prawns",
  "crab",
  "lobster",
  "shellfish",
  "salmon",
] as const;
