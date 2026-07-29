// NEXT_PUBLIC_ (not a server-only var) because SearchBar.tsx calls
// searchProducts() from client-side code — this must resolve in the browser too.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4300/api";

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

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const res = await fetch(`${API_URL}${path}${buildQuery(params)}`, { cache: "no-store" });
  if (!res.ok) throw new ApiFetchError(res.status, path);
  return res.json();
}

export async function apiGetOrUndefined<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T | undefined> {
  try {
    return await apiGet<T>(path, params);
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
