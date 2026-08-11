"use client";

import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import type { AppDispatch } from "@/store/store";
import { usePostMutation } from "@/store/apiSlice";
import { setCustomerCredentials } from "@/store/customerAuthSlice";
import { Button } from "@/components/ui/Button";
import type { Customer } from "@/types";

const fieldClasses =
  "h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-ocean-950 placeholder:text-gray-400 focus:border-aqua-400 focus:outline-none focus:ring-2 focus:ring-aqua-100";

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
  const [showPassword, setShowPassword] = useState(false);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="login-email" className="mb-1.5 block text-xs font-semibold text-gray-600">
          Email Address
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="login-email"
            required
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="login-password" className="mb-1.5 block text-xs font-semibold text-gray-600">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="login-password"
            required
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${fieldClasses} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <Button type="submit" variant="primary" size="lg" className="mt-1 w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log In"}
      </Button>

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
