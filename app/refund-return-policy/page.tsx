import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: `Refund & Return Policy | ${SITE_CONFIG.name}`,
  description: `Our refund and return policy for fresh fish and seafood orders at ${SITE_CONFIG.name}.`,
  alternates: { canonical: "/refund-return-policy" },
};

export default function RefundReturnPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund & Return Policy"
      path="/refund-return-policy"
      lastUpdated="17 September 2026"
    >
      <p>
        At {SITE_CONFIG.name}, we hand-pick every order and take care to deliver it fresh and in
        good condition. Because we sell live and fresh, perishable seafood, this policy works a
        little differently from policies for non-perishable goods — please read it before placing
        an order.
      </p>

      <h2>1. Nature of Our Products</h2>
      <p>
        For food safety and hygiene reasons, once a fresh or live seafood order has been delivered
        and accepted, it generally cannot be returned. We are, however, committed to making things
        right if something goes wrong with your order.
      </p>

      <h2>2. When You&apos;re Entitled to a Refund or Replacement</h2>
      <p>You are entitled to a free replacement or a full refund if:</p>
      <ul>
        <li>You received the wrong product or the wrong quantity.</li>
        <li>The item was visibly spoiled, not fresh, or of unacceptable quality on arrival.</li>
        <li>The item arrived damaged due to handling or packaging during delivery.</li>
        <li>Your order was short-delivered (an item you paid for was missing).</li>
      </ul>

      <h2>3. How to Report an Issue</h2>
      <p>To request a replacement or refund, please contact us as soon as possible, and in any case within 2 hours of delivery, with:</p>
      <ul>
        <li>Your order number.</li>
        <li>A clear photo of the product showing the issue.</li>
        <li>A brief description of what went wrong.</li>
      </ul>
      <p>
        You can reach us via WhatsApp or phone at {SITE_CONFIG.phone}, or by email at{" "}
        {SITE_CONFIG.email}. Reporting promptly helps us investigate the issue while it is still
        fresh in everyone&apos;s memory and, where relevant, with our delivery team.
      </p>

      <h2>4. How Refunds Are Processed</h2>
      <ul>
        <li>
          <strong>Cash on Delivery orders:</strong> we will offer a free replacement on your next
          order, or a refund transferred to your bank account.
        </li>
        <li>
          <strong>Bank Transfer orders:</strong> approved refunds are returned to the same bank
          account the payment was made from.
        </li>
      </ul>
      <p>
        Approved refunds are typically processed within 5–7 business days, though your bank may
        take additional time to reflect the funds in your account.
      </p>

      <h2>5. Situations Not Eligible for Refund</h2>
      <ul>
        <li>Change of mind after an order has been delivered and accepted.</li>
        <li>
          Spoilage caused by the product being left unattended or unrefrigerated after delivery.
        </li>
        <li>
          An incorrect delivery address or contact number provided by the customer, resulting in
          delayed delivery.
        </li>
        <li>Issues reported outside the reporting window described above without prior notice to us.</li>
        <li>
          Natural variation in the size, weight, or appearance of live/fresh seafood, which is not
          considered a defect.
        </li>
      </ul>

      <h2>6. Cancelling an Order</h2>
      <p>
        For information on cancelling an order before it is delivered, please see our{" "}
        <a href="/cancellation-policy">Cancellation Policy</a>.
      </p>

      <h2>7. Contact Us</h2>
      <p>If you have any questions about this policy or an existing order:</p>
      <ul>
        <li>Email: {SITE_CONFIG.email}</li>
        <li>Phone / WhatsApp: {SITE_CONFIG.phone}</li>
        <li>Address: {SITE_CONFIG.address}</li>
      </ul>
    </LegalPageLayout>
  );
}
