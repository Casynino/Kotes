import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

import { photos } from "@/content/media";
import { activeServices } from "@/content/services";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Network infrastructure, fibre optic installation, ICT hardware supply, data protection, systems integration and 24/7 managed support — delivered end to end across Tanzania by KOTES (T) LIMITED.",
  path: "/services",
  image: photos.patchPanel,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything from the first site survey to 24/7 managed support"
        description="Six service lines that cover the full lifecycle of an ICT estate. Take one, or hand us the whole programme under a single contract."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image={photos.patchPanel}
      >
        {/* Jump links so visitors reach any service in one click. */}
        <nav aria-label="Service list">
          <ul className="flex flex-wrap gap-2">
            {activeServices.map((service) => (
              <li key={service.id}>
                <Link
                  href={`#${service.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 text-sm font-medium text-ink-200 ring-1 ring-inset ring-white/15 backdrop-blur transition-colors hover:bg-white/15 hover:text-white"
                >
                  <Icon name={service.icon} className="h-4 w-4 text-brand-300" />
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {activeServices.map((service, index) => {
        const alternate = index % 2 === 1;

        return (
          <Section
            key={service.id}
            id={service.slug}
            labelledBy={`${service.slug}-heading`}
            tone={alternate ? "muted" : "default"}
            spacing="lg"
            className="scroll-mt-24"
          >
            <div className="container-page">
              <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Copy */}
                <Reveal className={cn("lg:col-span-7", alternate && "lg:order-2")}>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-[0_12px_28px_-12px_rgba(13,135,208,0.9)]">
                    <Icon name={service.icon} className="h-7 w-7" />
                  </span>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                    Service {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 id={`${service.slug}-heading`} className="text-h2 mt-3">
                    {service.title}
                  </h2>

                  <div className="mt-5 space-y-4 text-ink-600">
                    {service.description.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <h3 className="font-display mt-8 text-base font-bold text-ink-900">Key benefits</h3>
                  <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                    {service.benefits.map((benefit) => (
                      <li key={benefit.title} className="flex gap-3">
                        <Icon
                          name="check"
                          className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                          strokeWidth={2}
                        />
                        <span>
                          <span className="block text-sm font-semibold text-ink-900">
                            {benefit.title}
                          </span>
                          <span className="mt-0.5 block text-sm text-ink-600">
                            {benefit.description}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href={`/services/${service.slug}`} variant="secondary">
                      Full service detail
                      <ArrowRight />
                    </ButtonLink>
                    <ButtonLink href={`/contact?service=${encodeURIComponent(service.title)}`}>
                      Request a quote
                    </ButtonLink>
                  </div>
                </Reveal>

                {/* Aside */}
                <div className={cn("lg:col-span-5", alternate && "lg:order-1")}>
                  {service.image ? (
                    <Reveal delay={80}>
                      <div className="relative aspect-4/3 overflow-hidden rounded-panel shadow-card">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          loading="lazy"
                          className="object-cover"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent"
                        />
                      </div>
                    </Reveal>
                  ) : null}

                  <Reveal delay={140} className="mt-6 rounded-panel bg-ink-950 p-7 text-white">
                    <h3 className="font-display text-base font-bold text-white">What this covers</h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.capabilities.map((capability) => (
                        <li key={capability} className="flex items-start gap-2.5 text-sm text-ink-200">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                          />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={200} className="mt-6 rounded-panel bg-surface p-7 ring-1 ring-border-subtle">
                    <h3 className="font-display text-base font-bold text-ink-900">How we deliver it</h3>
                    <ol className="mt-4 space-y-4">
                      {service.process.map((step) => (
                        <li key={step.step} className="flex gap-4">
                          <span
                            aria-hidden="true"
                            className="font-display grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-xs font-extrabold text-brand-700 ring-1 ring-inset ring-brand-100"
                          >
                            {step.step}
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ink-900">
                              {step.title}
                            </span>
                            <span className="mt-0.5 block text-sm text-ink-600">
                              {step.description}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </Reveal>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <PartnerLogos />

      <CTASection
        eyebrow="Get a quote"
        title="Tell us the scope and we will price it properly"
        description="Send the site list, the drawings or just the problem. You will get a route, a plan and an itemised quotation — not a vague estimate."
        primaryLabel="Request a Consultation"
        secondaryLabel="See completed work"
      />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          ...activeServices.map((service) => serviceSchema(service)),
        ]}
      />
    </>
  );
}
