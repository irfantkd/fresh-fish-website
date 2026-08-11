"use client";

import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { usePutMutation } from "@/store/apiSlice";
import { setCustomer } from "@/store/customerAuthSlice";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { cn } from "@/lib/utils/cn";
import type { Customer } from "@/types";

const inputClasses =
  "h-11 w-full rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none";

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
    <div className="max-w-md rounded-3xl border border-gray-100 p-6">
      <h2 className="font-heading text-lg font-bold text-ocean-950">Profile Details</h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500">Full Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500">Email</label>
          <input
            disabled
            value={customer.email}
            className={cn(inputClasses, "cursor-not-allowed bg-gray-50 text-gray-400")}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500">Phone Number</label>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-gray-500">
            New Password (optional)
          </label>
          <input
            type="password"
            placeholder="Leave blank to keep current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
          />
        </div>
        {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        {success && (
          <p className="text-sm font-medium text-fresh-green-600">Profile updated successfully.</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 h-11 self-start rounded-xl bg-ocean-700 px-6 text-sm font-semibold text-white transition-colors hover:bg-ocean-600 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
