"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className,
  once = true,
  amount = 0.3,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
  // A fixed fraction (the default, 0.3) can fail to ever trigger for a
  // target much taller than the viewport — a fast scroll can jump straight
  // past the window where that fraction is visible. Pass "some" (triggers
  // on any overlap at all) for anything that wraps a multi-row grid rather
  // than a single card/heading-sized block.
  amount?: number | "some" | "all";
}) {
  const variants: Variants = {
    hidden: { opacity: 0, ...OFFSETS[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      // "some" (any overlap at all), not a fixed fraction — Stagger always
      // wraps a multi-row grid, which can be taller than the viewport, so a
      // fixed fraction risks never triggering on a fast scroll past it (see
      // the matching note on FadeIn's own `amount` prop).
      viewport={{ once: true, amount: "some" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
