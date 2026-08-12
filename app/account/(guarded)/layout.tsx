"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ShoppingBag, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccountGuard } from "@/components/account/AccountGuard";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { cn } from "@/lib/utils/cn";

const TABS = [
  { href: "/account", label: "Profile", icon: User },
  { href: "/account/orders", label: "My Orders", icon: ShoppingBag },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { customer, logout } = useCustomerAuth();

  return (
    <div className="py-12">
      <Container>
        <SectionHeading
          eyebrow="My Account"
          title={customer ? `Welcome, ${customer.name.split(" ")[0]}` : "My Account"}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
          <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
            {TABS.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "bg-ocean-50 text-ocean-900" : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  <tab.icon className="h-4 w-4" /> {tab.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={logout}
              className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </nav>

          <div>
            <AccountGuard>{children}</AccountGuard>
          </div>
        </div>
      </Container>
    </div>
  );
}
