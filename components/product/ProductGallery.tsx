"use client";

import { useState } from "react";
import { SeafoodImage } from "@/components/ui/SeafoodImage";
import { cn } from "@/lib/utils/cn";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gray-100">
        <SeafoodImage
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, i) => (
            <button
              key={image}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-100 ring-2 transition-all",
                active === i ? "ring-aqua-500" : "ring-transparent hover:ring-gray-200"
              )}
            >
              <SeafoodImage src={image} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
