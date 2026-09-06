import type { RobotsMeta } from "@/types";

// Shared by every page type (product, category, blog) that exposes an
// Index/Noindex control in the dashboard — maps the stored value to
// Next.js's `Metadata.robots` shape. New content always defaults to
// "index-follow" wherever this is read.
export const ROBOTS_MAP: Record<RobotsMeta, { index: boolean; follow: boolean }> = {
  "index-follow": { index: true, follow: true },
  "noindex-follow": { index: false, follow: true },
  "noindex-nofollow": { index: false, follow: false },
};

export function resolveRobots(robotsMeta: RobotsMeta | undefined) {
  return ROBOTS_MAP[robotsMeta ?? "index-follow"];
}
