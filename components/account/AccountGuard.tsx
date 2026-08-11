"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";

export function AccountGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, customer } = useCustomerAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/account/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) return null;

  if (!customer) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-400">
        Loading your account...
      </div>
    );
  }

  return <>{children}</>;
}
