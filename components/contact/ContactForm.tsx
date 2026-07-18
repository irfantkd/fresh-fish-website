"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to a real contact/inquiries API endpoint when available.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-fresh-green-500/30 bg-fresh-green-500/5 p-8 text-center">
        <h3 className="font-heading text-lg font-bold text-fresh-green-600">
          Message Sent!
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Thanks for reaching out — our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Your name"
          aria-label="Your name"
          className="h-12 rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none"
        />
        <input
          required
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          className="h-12 rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none"
        />
      </div>
      <input
        placeholder="Phone number"
        aria-label="Phone number"
        className="h-12 rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none"
      />
      <textarea
        required
        rows={5}
        placeholder="How can we help?"
        aria-label="Message"
        className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aqua-400 focus:outline-none"
      />
      <Button type="submit" variant="primary" size="lg" className="self-start">
        <Send className="h-4 w-4" /> Send Message
      </Button>
    </form>
  );
}
