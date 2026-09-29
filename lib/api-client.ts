// NEXT_PUBLIC_ (not a server-only var) because SearchBar.tsx calls
// searchProducts() from client-side code — this must resolve in the browser
// too. Always set via .env (committed, the shared default — e.g. the
// deployed backend on Vercel) and .env.local (gitignored, overrides it for
// local dev) — never hardcoded here, so there is always a real value by the
// time this module loads.
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export class ApiFetchError extends Error {
  status: number;
  constructor(status: number, path: string) {
    super(`API request to ${path} failed with status ${status}`);
    this.status = status;
  }
}

function buildQuery(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== ""
  ) as [string, string | number | boolean][];
  if (entries.length === 0) return "";
  const search = new URLSearchParams(entries.map(([key, value]) => [key, String(value)]));
  return `?${search.toString()}`;
}

/**
 * `revalidateSeconds` lets a caller opt into Next.js's fetch cache instead of
 * the default `no-store`. Only use it for data that can tolerate being a
 * little stale (categories, listings, blog posts, reviews) — never for a
 * single product's own price/stock (kept `no-store` in getProductBySlug) or
 * anything in the cart/checkout flow.
 */
export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
  revalidateSeconds?: number
): Promise<T> {
  const res = await fetch(`${API_URL}${path}${buildQuery(params)}`, {
    ...(revalidateSeconds
      ? { next: { revalidate: revalidateSeconds } }
      : { cache: "no-store" }),
  });
  if (!res.ok) throw new ApiFetchError(res.status, path);
  return res.json();
}

export async function apiGetOrUndefined<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
  revalidateSeconds?: number
): Promise<T | undefined> {
  try {
    return await apiGet<T>(path, params, revalidateSeconds);
  } catch (error) {
    if (error instanceof ApiFetchError && error.status === 404) return undefined;
    throw error;
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || `Request to ${path} failed with status ${res.status}`);
  }
  return data;
}

export { API_URL };
