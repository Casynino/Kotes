import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { differentiators, keysToSuccess } from "@/content/about";

export function WhyChooseUs() {
  return (
    <Section labelledBy="why-heading" tone="dark" spacing="lg" className="overflow-hidden">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl"
      />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            id="why-heading"
            eyebrow="Why choose us"
            tone="dark"
            align="center"
            title="Reasons institutions keep coming back"
            description="Repeat awards from the same ministries and authorities are the clearest measure of delivery. Here is what sits behind them."
          />
        </Reveal>

        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={index * 60} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-inset ring-white/15">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <h3 className="text-h3 text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16 rounded-panel bg-white/5 p-8 ring-1 ring-inset ring-white/10 backdrop-blur sm:p-10">
          <h3 className="text-h3 text-white">Keys to our success</h3>
          <ul className="mt-6 grid gap-x-10 gap-y-4 lg:grid-cols-2">
            {keysToSuccess.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-ink-200">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" strokeWidth={2} />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
