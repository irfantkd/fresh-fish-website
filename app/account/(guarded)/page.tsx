"use client";

import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Lock, Phone, User } from "lucide-react";
import type { AppDispatch } from "@/store/store";
import { usePutMutation } from "@/store/apiSlice";
import { setCustomer } from "@/store/customerAuthSlice";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils/format";
import type { Customer } from "@/types";

const fieldClasses =
  "h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-ocean-950 placeholder:text-gray-400 focus:border-aqua-400 focus:outline-none focus:ring-2 focus:ring-aqua-100";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export default function AccountProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { customer } = useCustomerAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  const [updateProfile, { isLoading }] = usePutMutation();

  // Seed the form once the profile arrives (it's null on first render until
  // CustomerAuthProvider's /customers/me fetch resolves). Adjusting state
  // during render — not in an effect — avoids an extra render pass.
  if (customer && loadedFor !== customer.id) {
    setLoadedFor(customer.id);
    setName(customer.name);
    setPhone(customer.phone);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const body: Record<string, string> = { name, phone };
      if (password) body.password = password;
      const updated = (await updateProfile({ path: "/customers/me", body }).unwrap()) as Customer;
      dispatch(setCustomer(updated));
      setPassword("");
      setSuccess(true);
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError?.data?.message ?? "Failed to update your profile.");
    }
  }

  if (!customer) return null;

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100">
      <div className="flex flex-wrap items-center gap-4 bg-linear-to-br from-ocean-900 via-ocean-800 to-navy-950 p-6 text-white sm:p-8">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-aqua-500/20 font-heading text-xl font-bold text-aqua-300">
          {getInitials(customer.name)}
        </div>
        <div>
          <p className="font-heading text-lg font-bold">{customer.name}</p>
          <p className="text-sm text-white/60">{customer.email}</p>
          <p className="mt-1 text-xs text-white/40">
            Member since {formatDate(customer.createdAt)}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 sm:p-8">
        <h2 className="font-heading text-base font-bold text-ocean-950">Profile Details</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="profile-name" className="mb-1.5 block text-xs font-semibold text-gray-600">
              Full Name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="profile-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClasses}
              />
            </div>
          </div>
          <div>
            <label htmlFor="profile-phone" className="mb-1.5 block text-xs font-semibold text-gray-600">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="profile-phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldClasses}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="profile-password" className="mb-1.5 block text-xs font-semibold text-gray-600">
            New Password (optional)
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="profile-password"
              type="password"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClasses}
            />
          </div>
        </div>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {success && (
          <p className="text-sm font-medium text-fresh-green-600">Profile updated successfully.</p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="mt-1 self-start"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
