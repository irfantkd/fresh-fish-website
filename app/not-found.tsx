import { Fish } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ocean-50 text-ocean-700">
          <Fish className="h-9 w-9" />
        </span>
        <h1 className="font-heading text-4xl font-bold text-ocean-950">404</h1>
        <p className="max-w-md text-gray-500">
          Looks like this catch got away. The page you're looking for doesn't exist.
        </p>
        <div className="flex gap-3">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/shop" variant="outline">
            Browse Seafood
          </Button>
        </div>
        <Link href="/contact" className="text-sm text-ocean-600 hover:underline">
          Need help? Contact us
        </Link>
      </Container>
    </div>
  );
}
