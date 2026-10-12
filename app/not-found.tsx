import { Fish } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SearchBar } from "@/components/layout/SearchBar";

const QUICK_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "How to Order", href: "/how-to-order" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] items-center py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ocean-50 text-ocean-700">
          <Fish className="h-9 w-9" />
        </span>
        <div>
          <h1 className="font-heading text-4xl font-bold text-ocean-950">404</h1>
          <p className="mt-2 max-w-md text-gray-500">
            Looks like this catch got away. The page you&apos;re looking for doesn&apos;t
            exist — but let&apos;s find you something fresh instead.
          </p>
        </div>

        <SearchBar className="w-full max-w-md" />

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/shop" variant="outline">
            Browse Seafood
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-sm">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ocean-600 hover:text-ocean-800 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
