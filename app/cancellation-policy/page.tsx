import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: `Cancellation Policy | ${SITE_CONFIG.name}`,
  description: `Our order cancellation policy at ${SITE_CONFIG.name}.`,
  alternates: { canonical: "/cancellation-policy" },
};

export default function CancellationPolicyPage() {
  return (
    <LegalPageLayout
      title="Cancellation Policy"
      path="/cancellation-policy"
      lastUpdated="17 September 2026"
    >
      <p>
        Because we hand-pick, clean, and prepare fish and seafood specifically for each order,
        cancellation windows are shorter than for typical retail goods. This policy explains when
        you can cancel an order, and when we may need to cancel one on our end.
      </p>

      <h2>1. Cancelling Your Order</h2>
      <p>
        You may cancel your order free of charge at any time before we have confirmed and begun
        preparing it. Once your order has been confirmed and preparation or dispatch has started,
        it can no longer be cancelled, as the product has already been hand-picked and cleaned
        specifically for your order.
      </p>
      <p>To cancel an order, contact us as soon as possible with your order number via:</p>
      <ul>
        <li>WhatsApp or phone: {SITE_CONFIG.phone}</li>
        <li>Email: {SITE_CONFIG.email}</li>
      </ul>
      <p>
        If your order was placed via WhatsApp and preparation has not yet started, simply message
        us to cancel it. If your order was placed through our website and your account shows the
        status as &quot;Pending&quot; or &quot;Confirmed&quot;, contact us immediately — once the
        status changes to &quot;Processing&quot; or later, the order can no longer be cancelled.
      </p>

      <h2>2. Same-Day and Live Orders</h2>
      <p>
        Some orders, particularly live seafood or same-day requests, may begin preparation shortly
        after confirmation. In these cases, the cancellation window may be very short or
        unavailable once the order is confirmed. We will always try to accommodate a cancellation
        request wherever possible.
      </p>

      <h2>3. Cancellations by Us</h2>
      <p>We may need to cancel an order in certain situations, including where:</p>
      <ul>
        <li>The item ordered is unexpectedly out of stock or unavailable.</li>
        <li>There was a pricing or listing error on our website.</li>
        <li>Your delivery address falls outside our current delivery area.</li>
        <li>We are unable to verify a bank transfer payment.</li>
        <li>We suspect the order is fraudulent or made in bad faith.</li>
      </ul>
      <p>
        If we cancel your order, we will notify you as soon as possible and issue a full refund
        for any payment already made, in line with our{" "}
        <a href="/refund-return-policy">Refund &amp; Return Policy</a>.
      </p>

      <h2>4. Refunds for Cancelled Orders</h2>
      <p>
        Where a payment has already been made for a cancelled order (e.g. via bank transfer),
        the amount will be refunded to the same account, typically within 5–7 business days.
      </p>

      <h2>5. Contact Us</h2>
      <ul>
        <li>Email: {SITE_CONFIG.email}</li>
        <li>Phone / WhatsApp: {SITE_CONFIG.phone}</li>
        <li>Address: {SITE_CONFIG.address}</li>
      </ul>
    </LegalPageLayout>
  );
}
