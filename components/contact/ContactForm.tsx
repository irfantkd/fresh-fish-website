"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitContactMessage } from "@/lib/services/contact.service";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await submitContactMessage(values);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
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
          value={values.name}
          onChange={handleChange("name")}
          placeholder="Your name"
          aria-label="Your name"
          className="h-12 rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none"
        />
        <input
          required
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          placeholder="Email address"
          aria-label="Email address"
          className="h-12 rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none"
        />
      </div>
      <input
        value={values.phone}
        onChange={handleChange("phone")}
        placeholder="Phone number"
        aria-label="Phone number"
        className="h-12 rounded-xl border border-gray-200 px-4 text-sm focus:border-aqua-400 focus:outline-none"
      />
      <textarea
        required
        rows={5}
        value={values.message}
        onChange={handleChange("message")}
        placeholder="How can we help?"
        aria-label="Message"
        className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aqua-400 focus:outline-none"
      />
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      <Button type="submit" variant="primary" size="lg" className="self-start" disabled={isSubmitting}>
        <Send className="h-4 w-4" /> {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
