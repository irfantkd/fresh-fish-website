"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/account/AuthLayout";
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
    <AuthLayout
      eyebrow="Join Fresh Fish Dubai"
      title="Create Your Account"
      description="Register in seconds to track orders, save your details, and check out faster."
      footer={
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href={loginHref} className="font-semibold text-aqua-600 hover:text-aqua-700">
            Log in
          </Link>
        </p>
      }
    >
      <RegisterForm onSuccess={() => router.push(redirectTo)} />
    </AuthLayout>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterPageContent />
    </Suspense>
  );
}
