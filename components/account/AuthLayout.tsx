import type { ReactNode } from "react";
import { Clock3, ShieldCheck, Truck } from "lucide-react";

const BENEFITS = [
  { icon: Truck, text: "Track every order from checkout to delivery" },
  { icon: Clock3, text: "Save your details for faster checkout next time" },
  { icon: ShieldCheck, text: "View your full order history any time" },
];

export function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-[75vh] lg:grid-cols-2">
      {/* Branded panel — hidden on small screens, where the form alone is enough. */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-ocean-900 via-ocean-800 to-navy-950 p-12 text-white lg:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-aqua-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-aqua-400/10 blur-3xl"
        />

        <div className="relative flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-aqua-500/20 font-heading text-lg font-bold text-aqua-300">
            FF
          </span>
          <span className="font-heading text-lg font-bold text-white">Fresh Fish Dubai</span>
        </div>

        <div className="relative flex flex-col gap-6">
          <h2 className="text-balance font-heading text-3xl font-bold leading-tight xl:text-4xl">
            Live &amp; fresh seafood, delivered to your door.
          </h2>
          <ul className="flex flex-col gap-3.5">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-white/75">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Icon className="h-3.5 w-3.5 text-aqua-300" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/40">
          &copy; {new Date().getFullYear()} Fresh Fish Dubai
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-4 py-14 sm:px-6 lg:px-12">
        <div className="w-full max-w-sm">
          <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-ocean-800 font-heading text-base font-bold text-aqua-300 lg:hidden">
            FF
          </span>

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-aqua-600">
            {eyebrow}
          </span>
          <h1 className="mt-2 font-heading text-2xl font-bold text-ocean-950 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{description}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-6">{footer}</div>
        </div>
      </div>
    </div>
  );
}
