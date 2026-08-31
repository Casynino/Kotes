import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { addressLine, company } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: `The terms that apply to your use of the ${company.legalName} website.`,
  path: "/terms",
});

/**
 * NOTE FOR THE KOTES TEAM
 * Website terms of use only. They do not govern your service contracts — those
 * remain in your signed agreements. Have these reviewed by your legal adviser
 * before launch.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" eyebrow="Legal" updated="31 August 2026">
      <p>
        These terms apply to your use of this website. By browsing the site you accept them. If you
        do not accept them, please do not use the site.
      </p>

      <h2>About us</h2>
      <p>
        This site is operated by {company.legalName}, a company incorporated in Tanzania on{" "}
        {company.foundedLabel}, with its registered office at {addressLine}.
      </p>

      <h2>Information on this site</h2>
      <p>
        We take care to keep the information on this site accurate and current, but it is provided
        for general information only. Project descriptions, contract values, capabilities and
        credentials are summaries and do not form part of any contract or offer. Nothing on this
        site is a binding quotation — quotations are issued in writing, individually, and are subject
        to their own terms.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, design, layout and graphics of this site are owned by or licensed to us and are
        protected by copyright and other intellectual property laws. You may view and print pages for
        your own reference. You may not reproduce, republish or exploit any part of the site
        commercially without our written permission.
      </p>
      <p>
        Third-party names, logos and trademarks appearing on this site remain the property of their
        respective owners and are used to identify products, services and organisations only.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not use the site for any unlawful or fraudulent purpose.</li>
        <li>
          Do not submit false, abusive or misleading information through the enquiry form, and do not
          use it to send unsolicited commercial messages.
        </li>
        <li>
          Do not attempt to gain unauthorised access to the site, its servers or any connected
          system, or interfere with its normal operation.
        </li>
        <li>Do not introduce malicious code, or attempt automated scraping that degrades service.</li>
      </ul>
      <p>We may restrict or block access where these terms are breached.</p>

      <h2>External links</h2>
      <p>
        Where we link to third-party websites, we do so for convenience. We do not control those
        sites and are not responsible for their content, availability or practices.
      </p>

      <h2>Availability and liability</h2>
      <p>
        We aim to keep the site available but do not guarantee uninterrupted access, and we may
        change or withdraw content without notice. To the extent permitted by law, we exclude
        liability for indirect or consequential loss arising from use of this site. Nothing in these
        terms limits liability that cannot lawfully be limited.
      </p>

      <h2>Privacy</h2>
      <p>
        Our handling of personal information is described in our <a href="/privacy">privacy policy</a>.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the United Republic of Tanzania, and the courts of
        Tanzania have exclusive jurisdiction over any dispute arising from them.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>
    </LegalPage>
  );
}
