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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Premium Fresh Seafood Delivery`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
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
  robots: {
    index: true,
    follow: true,
  },
};

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
