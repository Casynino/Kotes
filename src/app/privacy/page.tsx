import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { addressLine, company } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${company.legalName} collects, uses, stores and protects the personal information you provide through this website.`,
  path: "/privacy",
});

/**
 * NOTE FOR THE KOTES TEAM
 * This is a solid, honest starting policy that accurately describes what this
 * website actually does. It is not legal advice. Have it reviewed against the
 * Tanzania Personal Data Protection Act, 2022 (and the GDPR if you market into
 * the EU) before launch, and register with the Personal Data Protection
 * Commission if required for your processing activities.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" eyebrow="Legal" updated="31 August 2026">
      <p>
        {company.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy
        explains what personal information we collect through this website, why we collect it, how
        long we keep it and what rights you have over it.
      </p>

      <h2>Information we collect</h2>
      <p>We only collect information you choose to give us. Specifically:</p>
      <ul>
        <li>
          <strong>Enquiry form submissions.</strong> Your name, company name, email address, phone
          number, the service you are interested in, subject, message and (optionally) an indicative
          budget range.
        </li>
        <li>
          <strong>Technical information sent with your submission.</strong> Your browser user-agent
          string and the page you submitted from, used to diagnose problems and identify abuse.
        </li>
        <li>
          <strong>Your IP address, transiently.</strong> Used only to rate-limit the enquiry form
          against automated abuse. It is not stored alongside your enquiry.
        </li>
      </ul>
      <p>
        This website does not use advertising cookies, analytics cookies or third-party tracking
        scripts. No cookie banner is shown because no such cookies are set.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and to prepare quotations or proposals you have asked for.</li>
        <li>To maintain a record of business enquiries and their status.</li>
        <li>To protect the website against spam, abuse and fraudulent submissions.</li>
      </ul>
      <p>
        We do not sell your information, and we do not use it to send marketing you did not ask for.
      </p>

      <h2>Legal basis</h2>
      <p>
        We process enquiry information on the basis of the consent you give when you tick the consent
        box on the form, and on our legitimate interest in responding to business enquiries and
        keeping our systems secure. You may withdraw consent at any time by contacting us.
      </p>

      <h2>Sharing</h2>
      <p>
        Your enquiry is delivered to our company inbox and stored in our systems. We share it only
        with our own staff who need it to respond to you, and with our email service provider purely
        as part of transmitting the message. We may disclose information where we are legally
        required to do so.
      </p>

      <h2>Retention</h2>
      <p>
        We keep enquiry records for as long as needed to respond and to maintain a reasonable
        commercial record, and then delete them. If you ask us to delete your enquiry sooner, we
        will do so unless we are legally required to retain it.
      </p>

      <h2>Security</h2>
      <p>
        Enquiries are transmitted over an encrypted connection, validated and sanitised on our
        server, and stored with restricted access. Email credentials and system secrets are held in
        server-side environment variables and are never exposed to your browser. No system is
        perfectly secure, but we take reasonable technical and organisational measures to protect
        your information.
      </p>

      <h2>Embedded content</h2>
      <p>
        Our contact page embeds a Google Maps frame so you can find our office. When that map loads,
        Google may receive information about your visit under its own privacy policy. If you prefer
        not to load it, you can avoid the contact page map and reach us by phone or email instead.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask us to give you a copy of the information we hold about you, correct it, delete
        it, or stop processing it. Contact us using the details below and we will respond within a
        reasonable period.
      </p>

      <h2>Contact</h2>
      <p>
        {company.legalName}
        <br />
        {addressLine}
        <br />
        Email: <a href={`mailto:${company.email}`}>{company.email}</a>
        <br />
        Phone: {company.phones.join(" / ")}
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The date at the top of this page shows when it
        was last revised.
      </p>
    </LegalPage>
  );
}
