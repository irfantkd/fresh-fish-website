import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-ocean-700 text-white shadow-lg shadow-ocean-700/25 hover:bg-ocean-600 hover:shadow-xl hover:shadow-ocean-600/30",
        aqua: "bg-aqua-500 text-navy-950 shadow-lg shadow-aqua-500/25 hover:bg-aqua-400",
        outline:
          "border border-ocean-700/20 bg-white/70 text-ocean-800 backdrop-blur hover:border-ocean-700/40 hover:bg-white",
        ghost: "text-ocean-800 hover:bg-ocean-50",
        whatsapp:
          "bg-fresh-green-500 text-white shadow-lg shadow-fresh-green-500/25 hover:bg-fresh-green-600",
        white: "bg-white text-ocean-900 shadow-lg hover:bg-gray-50",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface BaseProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { className, variant, size, children } = props;

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      {...buttonProps}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}
