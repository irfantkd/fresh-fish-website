"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] w-full bg-transparent">
      <div
        className="h-full origin-left bg-linear-to-r from-aqua-400 via-aqua-500 to-ocean-600 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
