"use client";

import { ShoppingBag } from "lucide-react";
import { useGetQuery } from "@/store/apiSlice";
import { formatAED, formatDateTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Order, OrderStatus } from "@/types";

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-offer-500/10 text-offer-600",
  confirmed: "bg-aqua-500/10 text-aqua-700",
  out_for_delivery: "bg-aqua-500/10 text-aqua-700",
  delivered: "bg-fresh-green-500/10 text-fresh-green-600",
  cancelled: "bg-red-500/10 text-red-600",
};

export default function AccountOrdersPage() {
  const { data, isLoading } = useGetQuery({ path: "/customers/me/orders" });
  const orders = (data as Order[] | undefined) ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 w-full animate-pulse rounded-3xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
        <ShoppingBag className="h-10 w-10" />
        <p>You haven&apos;t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <div key={order.id} className="rounded-3xl border border-gray-100 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-heading text-base font-bold text-ocean-950">
                {order.orderNumber}
              </p>
              <p className="text-xs text-gray-400">{formatDateTime(order.createdAt)}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                STATUS_STYLE[order.status]
              )}
            >
              {STATUS_LABEL[order.status]}
            </span>
          </div>

          <ul className="mt-4 flex flex-col gap-1.5 text-sm text-gray-600">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.productName}
                {item.preparationType ? ` (${item.preparationType}, ${item.sizeLabel})` : ` (${item.sizeLabel})`}
                {" "}&times;{item.quantity}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4">
            <span className="text-sm text-gray-500">
              {order.paymentMethod === "cod" ? "Cash on Delivery" : "Bank Transfer"}
              {order.paymentMethod === "bank_transfer" && (
                <span className="ml-2 text-xs text-gray-400">
                  ({order.paymentStatus.replace(/_/g, " ")})
                </span>
              )}
            </span>
            <span className="font-heading text-base font-bold text-ocean-900">
              {formatAED(order.total)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
