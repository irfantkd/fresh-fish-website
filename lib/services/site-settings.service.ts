import { apiGetOrUndefined } from "@/lib/api-client";

export type GlobalIndexing = "index" | "noindex";

interface SiteSettings {
  globalIndexing: GlobalIndexing;
}

// Temporary, site-wide kill switch for search engine indexing — used while
// the site is still in development. If the backend is briefly unreachable,
// fail safe to "index" (normal behavior) rather than accidentally blocking
// the whole site from a transient fetch error.
export async function getGlobalIndexing(): Promise<GlobalIndexing> {
  const settings = await apiGetOrUndefined<SiteSettings>("/site-settings");
  return settings?.globalIndexing ?? "index";
}
