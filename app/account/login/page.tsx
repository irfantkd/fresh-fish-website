"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoginForm } from "@/components/account/LoginForm";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account";
  const registerHref =
    redirectTo === "/account"
      ? "/account/register"
      : `/account/register?redirect=${encodeURIComponent(redirectTo)}`;

  return (
    <div className="py-16">
      <Container className="max-w-md">
        <SectionHeading
          eyebrow="Welcome Back"
          title="Log In"
          align="center"
          className="mx-auto"
        />
        <div className="mt-8 rounded-3xl border border-gray-100 p-8">
          <LoginForm onSuccess={() => router.push(redirectTo)} />
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          New here?{" "}
          <Link href={registerHref} className="font-semibold text-aqua-600 hover:text-aqua-700">
            Create an account
          </Link>
        </p>
      </Container>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
