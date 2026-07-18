"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

export function useGsap<T extends HTMLElement>(
  callback: (context: { scope: RefObject<T | null> }) => void,
  deps: unknown[] = []
) {
  const scope = useRef<T | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => callback({ scope }), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
