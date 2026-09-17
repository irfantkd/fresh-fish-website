import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.name}`,
  description: `How ${SITE_CONFIG.name} collects, uses, and protects your personal information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" path="/privacy-policy" lastUpdated="17 September 2026">
      <p>
        {SITE_CONFIG.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates{" "}
        {SITE_CONFIG.url} and delivers fresh fish and seafood across Dubai, UAE. This Privacy
        Policy explains what personal information we collect when you browse our website, create
        an account, place an order, or contact us — and how we use, store, and protect it.
      </p>
      <p>
        By using our website, placing an order, or contacting us via WhatsApp, phone, or email,
        you agree to the collection and use of information as described in this policy.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect the following types of information:</p>
      <ul>
        <li>
          <strong>Account information:</strong> your name, email address, phone number, and a
          password (stored in encrypted/hashed form) when you register a customer account.
        </li>
        <li>
          <strong>Order information:</strong> delivery address, order items and quantities,
          preferred delivery time, order notes, and your order history.
        </li>
        <li>
          <strong>Payment information:</strong> your selected payment method (Cash on Delivery or
          Bank Transfer) and, for bank transfers, the payment receipt image you upload for
          verification. We do not collect or store card numbers, as we do not process card
          payments directly.
        </li>
        <li>
          <strong>Communications:</strong> messages you send us through our contact form,
          WhatsApp, phone, or email, including any details you share to help us process an order
          or resolve an issue.
        </li>
        <li>
          <strong>Reviews and feedback:</strong> product reviews, ratings, and comments you choose
          to submit.
        </li>
        <li>
          <strong>Newsletter sign-up:</strong> your email address, if you subscribe to updates.
        </li>
        <li>
          <strong>Technical information:</strong> basic device and browser information, and cart
          contents stored locally in your browser to keep your cart available between visits.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To create and manage your customer account.</li>
        <li>To process, confirm, prepare, and deliver your orders.</li>
        <li>To verify bank transfer payments before dispatching an order.</li>
        <li>To communicate with you about your order status, delivery updates, or issues.</li>
        <li>To respond to enquiries submitted via our contact form, WhatsApp, phone, or email.</li>
        <li>To display product reviews you have chosen to submit.</li>
        <li>To send you order updates, offers, or newsletters, where you have opted in.</li>
        <li>To improve our website, products, and delivery service.</li>
        <li>To detect and prevent fraudulent or unauthorized orders.</li>
        <li>To comply with our legal and accounting obligations in the UAE.</li>
      </ul>

      <h2>3. How We Share Your Information</h2>
      <p>
        We do not sell or rent your personal information to third parties. We only share your
        information where necessary to run our business:
      </p>
      <ul>
        <li>With our delivery riders/drivers, to complete delivery of your order.</li>
        <li>
          With our banking partner, where relevant, to verify a bank transfer payment you have
          made.
        </li>
        <li>
          With trusted service providers who support our operations, such as cloud hosting and
          image storage providers, who process data only on our instructions.
        </li>
        <li>
          With government or regulatory authorities, where required by UAE law or to protect our
          legal rights.
        </li>
      </ul>

      <h2>4. Data Storage and Security</h2>
      <p>
        We take reasonable technical and organizational measures to protect your personal
        information, including encrypting stored passwords and storing uploaded receipts and
        images through secure third-party storage providers. However, no method of transmission
        or storage is completely secure, and we cannot guarantee absolute security.
      </p>
      <p>
        We retain your account and order information for as long as your account remains active,
        and for a reasonable period afterward to meet our accounting, tax, and legal record-keeping
        obligations under UAE law.
      </p>

      <h2>5. Cookies and Local Storage</h2>
      <p>
        We use your browser&apos;s local storage to keep items in your cart and remember your
        login session, so you don&apos;t have to re-enter information on every visit. We do not
        use this data for third-party advertising.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Under the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data, you
        have the right to:
      </p>
      <ul>
        <li>Request access to the personal information we hold about you.</li>
        <li>Request correction of inaccurate or incomplete information.</li>
        <li>Request deletion of your account and associated personal information.</li>
        <li>Withdraw consent to marketing communications at any time.</li>
      </ul>
      <p>
        To exercise any of these rights, contact us using the details at the end of this policy.
      </p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>
        Our website and services are intended for individuals who are able to enter into a
        binding contract under UAE law. We do not knowingly collect personal information from
        children.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or
        for legal reasons. The &quot;Last updated&quot; date at the top of this page reflects the
        most recent version.
      </p>

      <h2>9. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy or your personal information:</p>
      <ul>
        <li>Email: {SITE_CONFIG.email}</li>
        <li>Phone / WhatsApp: {SITE_CONFIG.phone}</li>
        <li>Address: {SITE_CONFIG.address}</li>
      </ul>
    </LegalPageLayout>
  );
}
