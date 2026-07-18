"use client";

import gsap from "gsap";
import { useGsap } from "@/hooks/useGsap";
import { cn } from "@/lib/utils/cn";

export function GsapTextReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  const scope = useGsap<HTMLElement>(({ scope }) => {
    if (!scope.current) return;
    const targets = scope.current.querySelectorAll("[data-reveal-word]");
    gsap.fromTo(
      targets,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.06,
        delay,
      }
    );
  }, [text]);

  return (
    <Tag
      ref={scope as never}
      className={cn("inline-flex flex-wrap", className)}
    >
      {words.map((word, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden py-1 last:mr-0">
          <span data-reveal-word className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
