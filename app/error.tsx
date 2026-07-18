"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-heading text-3xl font-bold text-ocean-950">
          Something went wrong
        </h1>
        <p className="max-w-md text-gray-500">
          We hit a snag loading this page. Please try again, or head back home.
        </p>
        <div className="flex gap-3">
          <Button onClick={reset} variant="primary">
            Try Again
          </Button>
          <Button href="/" variant="outline">
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
