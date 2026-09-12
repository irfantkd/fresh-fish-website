import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { CartProvider } from "@/providers/CartProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { CustomerAuthProvider } from "@/providers/CustomerAuthProvider";
import { SITE_CONFIG } from "@/constants/site";
import { organizationJsonLd } from "@/lib/seo/json-ld";
import { getGlobalIndexing } from "@/lib/services/site-settings.service";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// generateMetadata (not a static `metadata` object) because the robots
// field below depends on a runtime fetch — see the TEMPORARY note on it.
export async function generateMetadata(): Promise<Metadata> {
  // TEMPORARY (development-only): the dashboard's site-wide indexing switch.
  // When set to Noindex, it blocks every page that doesn't define its own
  // `robots` field (static pages, the homepage). Pages that do set their own
  // — product/category/blog — apply this same override independently via
  // resolveRobots(). Remove this block (and the switch itself) once the
  // site is ready to go live.
  const globalIndexing = await getGlobalIndexing();
  const robots =
    globalIndexing === "noindex"
      ? { index: false, follow: false }
      : { index: true, follow: true };

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    // No title template here on purpose — a page's own title (the admin's
    // custom meta title for a product/category/blog post, or a static page's
    // literal title below) should render exactly as set, with nothing
    // auto-appended. This "default" only applies when a page sets no title
    // of its own at all.
    title: `${SITE_CONFIG.name} | Premium Fresh Seafood Delivery`,
    description: SITE_CONFIG.description,
    keywords: [
      "fresh fish Dubai",
      "seafood delivery Dubai",
      "buy salmon online UAE",
      "fresh prawns Dubai",
      "seafood market UAE",
    ],
    authors: [{ name: SITE_CONFIG.name }],
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      title: `${SITE_CONFIG.name} | Premium Fresh Seafood Delivery`,
      description: SITE_CONFIG.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_CONFIG.name} | Premium Fresh Seafood Delivery`,
      description: SITE_CONFIG.description,
    },
    alternates: {
      canonical: "/",
    },
    robots,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white text-ocean-950">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <StoreProvider>
          <CustomerAuthProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <WhatsAppFloatingButton />
            </CartProvider>
          </CustomerAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
