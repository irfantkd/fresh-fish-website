import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold font-heading tracking-wide",
  {
    variants: {
      variant: {
        fresh: "bg-fresh-green-500/10 text-fresh-green-600",
        premium: "bg-navy-900 text-aqua-300",
        offer: "bg-offer-500/10 text-offer-600",
        aqua: "bg-aqua-500/10 text-aqua-700",
        frozen: "bg-ocean-100 text-ocean-700",
        neutral: "bg-gray-100 text-gray-600",
        outOfStock: "bg-red-500/10 text-red-600",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export function Badge({
  className,
  variant,
  children,
}: VariantProps<typeof badgeVariants> & {
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
}
