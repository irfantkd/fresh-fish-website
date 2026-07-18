import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Container({
  className,
  children,
  as = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: ElementType;
}) {
  return createElement(
    as,
    { className: cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className) },
    children
  );
}
