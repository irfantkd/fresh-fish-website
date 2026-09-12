import { getGlobalIndexing } from "@/lib/services/site-settings.service";
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

// TEMPORARY (development-only): when the dashboard's site-wide indexing
// switch is set to Noindex, it overrides every page's own Index/Noindex
// setting — the whole site is kept out of Google/Search Console while it's
// still being built. Remove this global check (and the switch itself) once
// the site is ready to go live; each page's own setting will then apply on
// its own exactly as it already does.
export async function resolveRobots(robotsMeta: RobotsMeta | undefined) {
  const globalIndexing = await getGlobalIndexing();
  if (globalIndexing === "noindex") return { index: false, follow: false };
  return ROBOTS_MAP[robotsMeta ?? "index-follow"];
}
