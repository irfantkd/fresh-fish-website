import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${SITE_CONFIG.name}`,
  description: `The terms and conditions governing your use of ${SITE_CONFIG.name} and orders placed with us.`,
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      path="/terms-and-conditions"
      lastUpdated="17 September 2026"
    >
      <p>
        These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of {SITE_CONFIG.url} and
        any order placed with {SITE_CONFIG.name} (&quot;we&quot;, &quot;us&quot;, or
        &quot;our&quot;), whether through our website or via WhatsApp. By browsing our website or
        placing an order, you agree to be bound by these Terms.
      </p>

      <h2>1. About Us</h2>
      <p>
        {SITE_CONFIG.name} is a fresh fish and seafood retailer based at {SITE_CONFIG.address},
        offering hand-picked, prepared-to-order seafood delivered across Dubai.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        To place an order, you must be at least 18 years old and capable of entering into a
        legally binding contract under the laws of the United Arab Emirates. By placing an order,
        you confirm that the information you provide is accurate and complete.
      </p>

      <h2>3. Accounts</h2>
      <p>
        Creating an account is required to complete checkout on our website; guest ordering is
        also available via WhatsApp. You are responsible for maintaining the confidentiality of
        your login credentials and for all activity under your account. Please notify us
        immediately if you suspect unauthorized use of your account.
      </p>

      <h2>4. Products and Availability</h2>
      <ul>
        <li>
          We sell live and fresh fish and seafood, which is a natural product subject to seasonal
          availability, catch size, and supply. Certain products or sizes may occasionally be
          unavailable or substituted with a comparable item, and we will inform you where
          possible.
        </li>
        <li>
          Weights and sizes shown on our website (e.g. per-kilogram or per-piece variations) are
          approximate. As fish and seafood are natural products, minor variation in weight or
          appearance from what is pictured should be expected.
        </li>
        <li>Product images are for illustration purposes and may not reflect exact packaging.</li>
      </ul>

      <h2>5. Pricing</h2>
      <p>
        All prices are listed in UAE Dirhams (AED) and are subject to change without prior notice.
        The price applicable to your order is the price confirmed at the time your order is
        accepted. If a pricing error is identified before your order is dispatched, we will
        contact you before proceeding.
      </p>

      <h2>6. Placing an Order</h2>
      <p>
        Orders may be placed through our website checkout or via WhatsApp. An order is only
        confirmed once we accept it — adding items to your cart or sending a WhatsApp message does
        not guarantee acceptance. We reserve the right to refuse or cancel any order, including
        where an item is out of stock, a pricing or listing error has occurred, the delivery
        address falls outside our service area, or we suspect fraudulent activity.
      </p>

      <h2>7. Payment</h2>
      <p>
        We currently accept Cash on Delivery and Bank Transfer. For bank transfer payments, you
        must upload a receipt of your payment; your order will be prepared and dispatched only
        after we have verified the payment. See our{" "}
        <a href="/refund-return-policy">Refund &amp; Return Policy</a> for details on refunds.
      </p>

      <h2>8. Delivery</h2>
      <p>
        We deliver across serviceable areas of Dubai. Delivery timeframes provided at checkout or
        by our team are estimates and not guaranteed. Please see our{" "}
        <a href="/delivery-policy">Delivery Policy</a> for full details.
      </p>

      <h2>9. Cancellations, Refunds, and Returns</h2>
      <p>
        Because we sell perishable, fresh, and often prepared-to-order seafood, cancellations,
        refunds, and returns are subject to specific conditions. Please see our{" "}
        <a href="/cancellation-policy">Cancellation Policy</a> and{" "}
        <a href="/refund-return-policy">Refund &amp; Return Policy</a> for full details.
      </p>

      <h2>10. Your Conduct</h2>
      <p>
        You agree not to misuse our website, submit false or misleading information, place orders
        with fraudulent intent, or use our website in any way that could damage, disable, or
        impair our services.
      </p>

      <h2>11. Intellectual Property</h2>
      <p>
        All content on this website — including text, images, logos, and graphics — is owned by
        or licensed to {SITE_CONFIG.name} and may not be copied, reproduced, or used without our
        prior written consent.
      </p>

      <h2>12. Limitation of Liability</h2>
      <p>
        We aim to provide accurate product information and reliable delivery, but we do not
        guarantee that our website will be uninterrupted or error-free. To the fullest extent
        permitted by UAE law, we are not liable for indirect or consequential losses arising from
        your use of our website or products, except where such liability cannot be excluded by
        law.
      </p>

      <h2>13. Governing Law and Jurisdiction</h2>
      <p>
        These Terms are governed by the laws of the United Arab Emirates and the Emirate of Dubai.
        Any disputes arising from these Terms or your use of our website shall be subject to the
        exclusive jurisdiction of the competent courts of Dubai.
      </p>

      <h2>14. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of our website after any
        changes constitutes your acceptance of the updated Terms.
      </p>

      <h2>15. Contact Us</h2>
      <ul>
        <li>Email: {SITE_CONFIG.email}</li>
        <li>Phone / WhatsApp: {SITE_CONFIG.phone}</li>
        <li>Address: {SITE_CONFIG.address}</li>
      </ul>
    </LegalPageLayout>
  );
}
