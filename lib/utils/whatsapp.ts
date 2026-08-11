import { SITE_CONFIG } from "@/constants/site";
import type { CartItem } from "@/types";

export function buildProductInquiryLink(productName: string): string {
  const message = `Hi Fresh Fish Dubai! I'm interested in ${productName}. Could you share more details?`;
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildCartOrderLink(
  items: CartItem[],
  customer: { name: string; phone: string; address: string; deliveryTime?: string; notes?: string }
): string {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const lines = [
    `*New Order - Fresh Fish Dubai*`,
    "",
    ...items.map(
      (item, i) =>
        `${i + 1}. ${item.productName} (${item.sizeLabel}) x${item.quantity} — ${item.price * item.quantity} AED${item.notes ? `\n   Note: ${item.notes}` : ""}`
    ),
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
