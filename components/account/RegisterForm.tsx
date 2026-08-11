"use client";

import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import type { AppDispatch } from "@/store/store";
import { usePostMutation } from "@/store/apiSlice";
import { setCustomerCredentials } from "@/store/customerAuthSlice";
import { Button } from "@/components/ui/Button";
import type { Customer } from "@/types";

const fieldClasses =
  "h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-ocean-950 placeholder:text-gray-400 focus:border-aqua-400 focus:outline-none focus:ring-2 focus:ring-aqua-100";

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
  const [showPassword, setShowPassword] = useState(false);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="reg-name" className="mb-1.5 block text-xs font-semibold text-gray-600">
          Full Name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="reg-name"
            required
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg-email" className="mb-1.5 block text-xs font-semibold text-gray-600">
          Email Address
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="reg-email"
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
        <label htmlFor="reg-phone" className="mb-1.5 block text-xs font-semibold text-gray-600">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="reg-phone"
            required
            placeholder="05X XXX XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg-password" className="mb-1.5 block text-xs font-semibold text-gray-600">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="reg-password"
            required
            type={showPassword ? "text" : "password"}
            placeholder="At least 6 characters"
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

      <div>
        <label
          htmlFor="reg-confirm-password"
          className="mb-1.5 block text-xs font-semibold text-gray-600"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id="reg-confirm-password"
            required
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={fieldClasses}
          />
        </div>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <Button type="submit" variant="primary" size="lg" className="mt-1 w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>

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
