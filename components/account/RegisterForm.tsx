"use client";

import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { usePostMutation } from "@/store/apiSlice";
import { setCustomerCredentials } from "@/store/customerAuthSlice";
import type { Customer } from "@/types";

const inputClasses =
  "h-11 w-full rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none";

interface RegisterResponse {
  token: string;
  customer: Customer;
}

export function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: {
  onSuccess?: (customer: Customer) => void;
  onSwitchToLogin?: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [register, { isLoading }] = usePostMutation();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const result = (await register({
        path: "/customers/register",
        body: { name, email, phone, password },
      }).unwrap()) as RegisterResponse;
      dispatch(setCustomerCredentials(result));
      onSuccess?.(result.customer);
    } catch (err) {
      const apiError = err as { data?: { message?: string } };
      setError(apiError?.data?.message ?? "Failed to create your account. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        required
        placeholder="Full name"
        aria-label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClasses}
      />
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
        placeholder="Phone number"
        aria-label="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputClasses}
      />
      <input
        required
        type="password"
        placeholder="Password (min. 6 characters)"
        aria-label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClasses}
      />
      <input
        required
        type="password"
        placeholder="Confirm password"
        aria-label="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={inputClasses}
      />
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="h-11 rounded-xl bg-ocean-700 text-sm font-semibold text-white transition-colors hover:bg-ocean-600 disabled:opacity-50"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </button>
      {onSwitchToLogin && (
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-center text-sm text-gray-500 hover:text-aqua-700"
        >
          Already have an account? <span className="font-semibold text-aqua-600">Log In</span>
        </button>
      )}
    </form>
  );
}
