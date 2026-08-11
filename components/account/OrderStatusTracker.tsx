import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { OrderStatus } from "@/types";

const PIPELINE: { key: OrderStatus; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export function OrderStatusTracker({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
        This order was cancelled.
      </div>
    );
  }

  const currentIndex = PIPELINE.findIndex((step) => step.key === status);

  return (
    <div className="flex items-start">
      {PIPELINE.map((step, i) => {
        const isComplete = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isLast = i === PIPELINE.length - 1;

        return (
          <div key={step.key} className={cn("flex items-start", !isLast && "flex-1")}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  isComplete
                    ? "bg-fresh-green-500 text-white"
                    : isCurrent
                      ? "bg-aqua-500 text-white ring-4 ring-aqua-100"
                      : "bg-gray-100 text-gray-400"
                )}
              >
                {isComplete ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden text-center text-[10px] font-medium leading-tight sm:block",
                  isComplete || isCurrent ? "text-ocean-900" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-1 mt-3.5 h-0.5 flex-1 rounded-full transition-colors",
                  isComplete ? "bg-fresh-green-500" : "bg-gray-100"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
