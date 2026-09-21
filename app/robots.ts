import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { getGlobalIndexing } from "@/lib/services/site-settings.service";

export default async function robots(): Promise<MetadataRoute.Robots> {
  // TEMPORARY (development-only): mirrors the dashboard's site-wide
  // indexing switch — when off, block crawlers entirely at the robots.txt
  // level too, not just via the per-page meta tag. Remove this check (and
  // the switch itself) once the site is ready to go live.
  const globalIndexing = await getGlobalIndexing();
  if (globalIndexing === "noindex") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/cgi-bin/"],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
