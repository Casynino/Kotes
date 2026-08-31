import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coreValues, mission, vision } from "@/content/about";

export function AboutIntro() {
  return (
    <Section labelledBy="about-intro-heading" tone="default" spacing="lg">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              id="about-intro-heading"
              eyebrow="Who we are"
              title="Three decades of engineering Tanzania's ICT backbone"
              description="KOTES (T) LIMITED is a premier Information and Communication Technology company based in Tanzania. Founded on 15 May 1995, it is a dynamic, locally-owned enterprise with a strong reputation for delivering high-quality, tailored ICT solutions across the public and private sectors."
            />
            <p className="mt-5 max-w-xl text-ink-600">
              With a highly skilled team of certified engineers, we provide strategic services ranging
              from network design and integration to mission-critical ICT infrastructure deployment and
              maintenance — recognised as a trusted government IT tender holder.
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="secondary">
                More about us
                <ArrowRight />
              </ButtonLink>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:col-span-6">
            <Reveal delay={80} className="rounded-panel bg-ink-950 p-7 text-white sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-inset ring-white/15">
                  <Icon name="sparkle" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-h3 text-white">Our Mission</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-200">{mission}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140} className="rounded-panel bg-brand-700 p-7 text-white sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-inset ring-white/25">
                  <Icon name="chart" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-h3 text-white">Our Vision</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-50">{vision}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} className="rounded-panel bg-surface-muted p-7 ring-1 ring-border-subtle sm:p-8">
              <h3 className="text-h3">Our Core Values</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {coreValues.map((value) => (
                  <li key={value.id} className="flex items-center gap-2.5 text-sm font-semibold text-ink-800">
                    <Icon name={value.icon} className="h-5 w-5 shrink-0 text-brand-600" />
                    {value.title}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
