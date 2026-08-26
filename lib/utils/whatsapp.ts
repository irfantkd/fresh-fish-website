import { SITE_CONFIG } from "@/constants/site";
import { formatWeight } from "@/lib/utils/format";
import type { CartItem } from "@/types";

interface DirectOrderItem {
  productName: string;
  type?: string;
  sizeLabel: string;
  weightGrams: number;
  price: number;
  quantity: number;
}

// Used by the "Order on WhatsApp" quick-order buttons (product card, product
// detail page) — carries the exact variation and quantity the customer
// already selected, instead of a generic "tell me more" inquiry.
export function buildDirectOrderLink(item: DirectOrderItem): string {
  const variant = item.type ? `${item.type}, ${item.sizeLabel}` : item.sizeLabel;
  const total = item.price * item.quantity;

  const lines = [
    `*New Order - Fresh Fish Dubai*`,
    "",
    `${item.productName} (${variant}, ${formatWeight(item.weightGrams)}) x${item.quantity} — ${total} AED`,
    "",
    `*Order Total:* ${total} AED`,
    "",
    "Please confirm this order and let me know how to share my delivery details.",
  ];

  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function buildCartOrderLink(
  items: CartItem[],
  customer: { name: string; phone: string; address: string; deliveryTime?: string; notes?: string }
): string {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const lines = [
    `*New Order - Fresh Fish Dubai*`,
    "",
    ...items.map((item, i) => {
      const variant = item.preparationType
        ? `${item.preparationType}, ${item.sizeLabel}`
        : item.sizeLabel;
      return `${i + 1}. ${item.productName} (${variant}) x${item.quantity} — ${item.price * item.quantity} AED${item.notes ? `\n   Note: ${item.notes}` : ""}`;
    }),
    "",
    `*Order Total:* ${total} AED`,
    "",
    `*Customer:* ${customer.name}`,
    `*Phone:* ${customer.phone}`,
    `*Delivery Address:* ${customer.address}`,
    customer.deliveryTime ? `*Preferred Time:* ${customer.deliveryTime}` : "",
    customer.notes ? `*Notes:* ${customer.notes}` : "",
  ].filter(Boolean);

  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
