"use client";

import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { usePostMutation } from "@/store/apiSlice";
import { setCustomerCredentials } from "@/store/customerAuthSlice";
import { cn } from "@/lib/utils/cn";
import type { Customer } from "@/types";

const inputClasses =
  "h-11 w-full rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none";

interface LoginResponse {
  token: string;
  customer: Customer;
}

export function LoginForm({
  onSuccess,
  onSwitchToRegister,
}: {
  onSuccess?: (customer: Customer) => void;
  onSwitchToRegister?: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = usePostMutation();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      const result = (await login({
        path: "/customers/login",
        body: { email, password },
      }).unwrap()) as LoginResponse;
      dispatch(setCustomerCredentials(result));
      onSuccess?.(result.customer);
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError?.data?.message ?? "Failed to log in. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        required
        type="email"
        placeholder="Email address"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClasses}
      />
      <input
        required
        type="password"
        placeholder="Password"
        aria-label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClasses}
      />
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "h-11 rounded-xl bg-ocean-700 text-sm font-semibold text-white transition-colors hover:bg-ocean-600 disabled:opacity-50"
        )}
      >
        {isLoading ? "Logging in..." : "Log In"}
      </button>
      {onSwitchToRegister && (
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-center text-sm text-gray-500 hover:text-aqua-700"
        >
          Don&apos;t have an account? <span className="font-semibold text-aqua-600">Register</span>
        </button>
      )}
    </form>
  );
}
