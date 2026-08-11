"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RegisterForm } from "@/components/account/RegisterForm";

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account";
  const loginHref =
    redirectTo === "/account"
      ? "/account/login"
      : `/account/login?redirect=${encodeURIComponent(redirectTo)}`;

  return (
    <div className="py-16">
      <Container className="max-w-md">
        <SectionHeading
          eyebrow="Join Fresh Fish Dubai"
          title="Create Your Account"
          align="center"
          className="mx-auto"
        />
        <div className="mt-8 rounded-3xl border border-gray-100 p-8">
          <RegisterForm onSuccess={() => router.push(redirectTo)} />
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href={loginHref} className="font-semibold text-aqua-600 hover:text-aqua-700">
            Log in
          </Link>
        </p>
      </Container>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterPageContent />
    </Suspense>
  );
}
