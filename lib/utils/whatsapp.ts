import { SITE_CONFIG } from "@/constants/site";
import type { CartItem } from "@/types";

export function buildProductInquiryLink(productName: string): string {
  const message = `Hi Fresh Fish Dubai! I'm interested in ${productName}. Could you share more details?`;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildCartOrderLink(
  items: CartItem[],
  customer: { name: string; address: string; deliveryTime?: string }
): string {
  const lines = [
    `*New Order - Fresh Fish Dubai*`,
    "",
    ...items.map(
      (item, i) =>
        `${i + 1}. ${item.productName} (${item.sizeLabel}) x${item.quantity} — ${item.price * item.quantity} AED${item.notes ? `\n   Note: ${item.notes}` : ""}`
    ),
    "",
    `*Customer:* ${customer.name}`,
    `*Delivery Address:* ${customer.address}`,
    customer.deliveryTime ? `*Preferred Time:* ${customer.deliveryTime}` : "",
  ].filter(Boolean);

  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
