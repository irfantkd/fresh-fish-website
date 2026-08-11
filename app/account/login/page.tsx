"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/account/AuthLayout";
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
    <AuthLayout
      eyebrow="Welcome Back"
      title="Log In to Your Account"
      description="Enter your details to track orders and check out faster."
      footer={
        <p className="text-center text-sm text-gray-500">
          New here?{" "}
          <Link href={registerHref} className="font-semibold text-aqua-600 hover:text-aqua-700">
            Create an account
          </Link>
        </p>
      }
    >
      <LoginForm onSuccess={() => router.push(redirectTo)} />
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
