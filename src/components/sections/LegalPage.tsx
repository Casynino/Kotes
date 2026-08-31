import type { ReactNode } from "react";

import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";

/** Shared shell for policy pages, with readable measure and consistent typography. */
export function LegalPage({
  title,
  eyebrow,
  updated,
  children,
}: {
  title: string;
  eyebrow: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={`Last updated ${updated}`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />
      <Section spacing="lg">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-8 text-ink-700 [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:text-h3 [&_h2]:mt-10 [&_h2]:text-ink-900 [&_li]:leading-relaxed [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </Section>
    </>
  );
}
