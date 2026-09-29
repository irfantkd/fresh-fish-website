import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: `Delivery Policy | ${SITE_CONFIG.name}`,
  description: `Delivery areas, timing, and charges for ${SITE_CONFIG.name} orders across Dubai.`,
  alternates: { canonical: "/delivery-policy" },
};

export default function DeliveryPolicyPage() {
  return (
    <LegalPageLayout
      title="Delivery Policy"
      path="/delivery-policy"
      lastUpdated="17 September 2026"
    >
      <p>
        This policy explains how, when, and where we deliver your fresh fish and seafood order
        across Dubai.
      </p>

      <h2>1. Delivery Areas</h2>
      <p>
        We deliver across serviceable neighborhoods in Dubai. You can check estimated delivery
        times for your area on our <a href="/delivery-areas">Delivery Areas</a> page. If your area
        is not listed, contact us on WhatsApp at {SITE_CONFIG.phone} and we will let you know if we
        can arrange delivery.
      </p>

      <h2>2. Delivery Charges</h2>
      <p>
        Delivery charges and the minimum order value depend on your area. We confirm both on
        WhatsApp when you place your order.
      </p>

      <h2>3. Order Placement and Delivery Hours</h2>
      <p>
        You can place an order through our website or WhatsApp at any time, 24/7. Orders are
        processed and delivered during our operating hours, 9:00 AM – 10:00 PM, seven days a week.
        Orders placed outside these hours will be processed as soon as we reopen.
      </p>

      <h2>4. Packaging and Freshness</h2>
      <p>
        Every order is hand-inspected and packed in insulated, cold-chain packaging to keep your
        seafood fresh and safe from the moment it leaves us to the moment it reaches your door.
      </p>

      <h2>5. Order Tracking</h2>
      <p>
        If you checked out through your account, you can track your order&apos;s progress from
        your account dashboard, through the following stages: Pending → Confirmed → Processing →
        Shipped → Out for Delivery → Delivered. Orders placed via WhatsApp can be tracked by
        messaging us directly.
      </p>

      <h2>6. Delivery Timeframes</h2>
      <p>
        Delivery timeframes shown at checkout, on our Delivery Areas page, or given by our team
        are estimates. While we aim to deliver within the stated window, factors such as traffic,
        weather, or exceptionally high demand may occasionally cause delays. We will keep you
        informed if a significant delay is expected.
      </p>

      <h2>7. Receiving Your Delivery</h2>
      <p>
        Please ensure someone is available at the delivery address during the expected delivery
        window, and that the address and contact number provided at checkout are accurate. If our
        delivery rider is unable to reach you or complete delivery due to an incorrect address,
        an unreachable phone number, or no one being available to receive the order, we may need
        to reschedule delivery, and additional charges may apply for repeated failed delivery
        attempts.
      </p>
      <p>
        Because our products are fresh and perishable, please inspect your order promptly upon
        receipt — see our <a href="/refund-return-policy">Refund &amp; Return Policy</a> if there
        is an issue with your delivery.
      </p>

      <h2>8. Contact Us</h2>
      <ul>
        <li>Email: {SITE_CONFIG.email}</li>
        <li>Phone / WhatsApp: {SITE_CONFIG.phone}</li>
        <li>Address: {SITE_CONFIG.address}</li>
      </ul>
    </LegalPageLayout>
  );
}
