import { NextResponse, type NextRequest } from "next/server";

// Every page's canonical URL is hardcoded to the non-www domain (see
// SITE_CONFIG.url / metadataBase in app/layout.tsx). Without this, visiting
// the site on the www domain serves the exact same page live at a URL that
// disagrees with its own canonical tag — which is exactly what SEO tools
// flag as "not indexable" / "canonicalised". Permanently redirecting www to
// non-www here means that mismatch can never actually happen: the www
// domain never serves content directly, it only ever forwards to the
// canonical (simple, non-www) one.
const CANONICAL_HOST = "freshfishdubai.com";
const NON_CANONICAL_HOST = "www.freshfishdubai.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (host === NON_CANONICAL_HOST) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Skip static assets and Next internals — only redirect actual page/API requests.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png).*)"],
};
