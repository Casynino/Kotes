import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredServices } from "@/content/services";

export function ServicesPreview() {
  return (
    <Section labelledBy="services-preview-heading" tone="muted" spacing="lg">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="services-preview-heading"
            eyebrow="What we do"
            title="End-to-end ICT capability under one contract"
            description="From the first site survey to 24/7 managed support, we cover every stage so you are never left coordinating between suppliers."
            className="max-w-2xl"
          />
          <ButtonLink href="/services" variant="secondary" className="shrink-0">
            All services
            <ArrowRight />
          </ButtonLink>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <li key={service.id}>
              <Reveal delay={index * 70}>
                <Card
                  href={`/services/${service.slug}`}
                  label={`Read more about ${service.title}`}
                  className="h-full p-7"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
                    <Icon name={service.icon} />
                  </span>
                  <h3 className="text-h3 mt-5">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{service.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    Learn more
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10 rounded-panel bg-surface p-6 ring-1 ring-border-subtle sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink-700">
              Not sure which service fits?{" "}
              <span className="font-semibold text-ink-900">
                Tell us the problem and we will scope it with you.
              </span>
            </p>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Request a consultation
              <ArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
