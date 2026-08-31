import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/content/company";

export function CTASection({
  eyebrow = "Start a conversation",
  title = "Tell us what you need to build, connect or protect",
  description = "Send us the scope, the site list or just the problem. We will come back with a route, a plan and an itemised quotation.",
  primaryLabel = "Request a Quote",
  primaryHref = "/contact",
  secondaryLabel = "View our projects",
  secondaryHref = "/projects",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-brand-700 py-20 text-white lg:py-24">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-400/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-ink-950/30 blur-3xl"
      />

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">{eyebrow}</p>
          <h2 id="cta-heading" className="text-h2 mt-4 text-white">
            {title}
          </h2>
          <p className="text-lead mt-5 text-brand-50">{description}</p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={primaryHref} size="lg" variant="onDark">
              {primaryLabel}
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href={secondaryHref} size="lg" variant="outlineOnDark">
              {secondaryLabel}
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-col items-center justify-center gap-4 text-sm text-brand-50 sm:flex-row sm:gap-8">
            <li>
              <a
                href={`tel:${company.primaryPhoneE164}`}
                className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-white"
              >
                <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                {company.phones[0]}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-white"
              >
                <Icon name="check" className="h-4 w-4" strokeWidth={2} />
                {company.email}
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
