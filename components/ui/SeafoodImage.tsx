"use client";

import Image, { type ImageProps } from "next/image";
import { useRef, useState } from "react";

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
    return "https://picsum.photos/seed/seafood-fallback/1000/1000";
  }
}

export function SeafoodImage({ src, ...props }: ImageProps & { src: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const attempts = useRef(0);

  function handleError() {
    attempts.current += 1;
    if (attempts.current === 1) {
      setCurrentSrc(`${src}${src.includes("?") ? "&" : "?"}retry=1`);
    } else {
      setCurrentSrc(toFallbackSrc(src));
    }
  }

  return <Image {...props} src={currentSrc} onError={handleError} />;
}
