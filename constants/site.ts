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
  // 25°17'31.9"N 55°19'25.6"E — the shop's exact coordinates.
  latitude: 25.292194,
  longitude: 55.323778,
  mapEmbedUrl: "https://www.google.com/maps?q=25.292194,55.323778&z=18&output=embed",
  mapLinkUrl: "https://www.google.com/maps?q=25.292194,55.323778&z=18",
  social: {
    instagram: "https://instagram.com/freshfishdubai",
    facebook: "https://facebook.com/freshfishdubai",
    tiktok: "https://tiktok.com/@freshfishdubai",
  },
} as const;

// Straight-line ("as the crow flies") distance tiers from the shop, not real
// driving distance — there's no routing API wired up. Must stay in sync with
// DELIVERY_TIERS in the backend's order.controller.js, which is the
// authoritative calculation; everything here is for display/preview only
// (the backend never trusts a client-sent fee).
export const DELIVERY_TIERS = [
  { upToKm: 20, fee: 30 },
  { upToKm: 30, fee: 35 },
  { upToKm: 40, fee: 45 },
  { upToKm: 50, fee: 60 },
  { upToKm: 70, fee: 80 },
  { upToKm: 100, fee: 100 },
] as const;

export const DELIVERY = {
  // Default/base fee shown before a customer shares a delivery pin.
  dubaiFeeAED: DELIVERY_TIERS[0].fee,
  note: "AED 30 delivery within 20km of our shop. Delivery fees increase for farther distances — share your pin at checkout for an exact quote, or we'll confirm it with you before dispatch.",
} as const;

// Returns the AED fee for a given straight-line distance, or null if the pin
// is beyond our last tier (100km) and needs manual confirmation instead.
export function getDeliveryFeeForDistance(distanceKm: number): number | null {
  const tier = DELIVERY_TIERS.find((t) => distanceKm <= t.upToKm);
  return tier ? tier.fee : null;
}

// Haversine formula — straight-line distance in km between two lat/lng
// points. Mirrors the backend's own implementation exactly (see
// haversineDistanceKm in order.controller.js) so the client-side preview
// matches what the server will actually charge.
export function haversineDistanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

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
  { label: "How to Order", href: "/how-to-order" },
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
    { label: "How to Order", href: "/how-to-order" },
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
