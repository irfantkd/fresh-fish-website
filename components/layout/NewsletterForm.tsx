"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Wire this up to a real subscription API endpoint when available.
    setSubmitted(true);
    setEmail("");
  }

  if (submitted) {
    return (
      <p className={className}>
        <span className="font-heading font-semibold text-aqua-300">
          Thank you for subscribing!
        </span>{" "}
        Watch your inbox for fresh offers.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex w-full max-w-sm items-center gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/15">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          className="h-10 w-full rounded-full bg-transparent px-4 text-sm text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-aqua-500 text-navy-950 transition-colors hover:bg-aqua-400"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
