import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-aqua-600">
          {eyebrow}
        </span>
      )}
      <Heading className="text-balance font-heading text-3xl font-bold tracking-tight text-ocean-950 sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base text-gray-500 sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
