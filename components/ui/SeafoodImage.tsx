"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK_SRC = "https://picsum.photos/seed/seafood-fallback/1000/1000";

/**
 * LoremFlickr (our real-photo source for seafood images) is occasionally
 * flaky upstream — failures are transient/random, not tied to a specific
 * photo. On error we retry the same URL once (a fresh request often
 * succeeds), then fall back to a deterministic Picsum image (same seed) so
 * a second failure never renders as a broken image for a real visitor.
 */
function toFallbackSrc(src: string): string {
  try {
    const url = new URL(src);
    const lock = url.searchParams.get("lock") ?? "0";
    return `https://picsum.photos/seed/seafood-${lock}/1000/1000`;
  } catch {
    return FALLBACK_SRC;
  }
}

export function SeafoodImage({ src, ...props }: ImageProps & { src: string }) {
  // A product/category/blog without an image set yet has an empty-string
  // url — never hand that to next/image (it warns, fails to load, and the
  // retry logic below would build an invalid "?retry=1" src from it, which
  // crashes next/image's own URL parsing). Use the same fallback photo
  // immediately instead.
  const safeSrc = src || FALLBACK_SRC;

  const [currentSrc, setCurrentSrc] = useState(safeSrc);
  const [renderedSrc, setRenderedSrc] = useState(safeSrc);
  const [attempts, setAttempts] = useState(0);

  // `src` can change while this instance stays mounted (e.g. clicking a
  // different gallery thumbnail) — resync during render (React's recommended
  // pattern for this) so the image updates immediately instead of getting
  // stuck on whatever it first rendered.
  if (safeSrc !== renderedSrc) {
    setRenderedSrc(safeSrc);
    setCurrentSrc(safeSrc);
    setAttempts(0);
  }

  function handleError() {
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    if (nextAttempts === 1) {
      setCurrentSrc(`${safeSrc}${safeSrc.includes("?") ? "&" : "?"}retry=1`);
    } else {
      setCurrentSrc(toFallbackSrc(safeSrc));
    }
  }

  return <Image {...props} src={currentSrc} onError={handleError} />;
}
