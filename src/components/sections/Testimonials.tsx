import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { activeTestimonials } from "@/content/testimonials";

/**
 * Testimonials.
 * Renders nothing when no approved quotes exist, so an empty content file
 * never leaves a hollow section on the page.
 */
export function Testimonials() {
  if (activeTestimonials.length === 0) return null;

  return (
    <Section labelledBy="testimonials-heading" tone="muted" spacing="lg">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="testimonials-heading"
            eyebrow="In their words"
            align="center"
            title="What our clients say"
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {activeTestimonials.map((testimonial, index) => (
            <li key={testimonial.id}>
              <Reveal delay={index * 80} className="h-full">
                <figure className="flex h-full flex-col rounded-card bg-surface p-7 shadow-card ring-1 ring-border-subtle">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-8 w-8 shrink-0 fill-brand-200"
                  >
                    <path d="M9.5 5.5C6 7 4 10 4 13.7c0 2.8 1.7 4.8 4.2 4.8 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1 .1.4-1.7 1.9-3.3 4-4.2l-2.2-1.7Zm10 0C16 7 14 10 14 13.7c0 2.8 1.7 4.8 4.2 4.8 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1 .1.4-1.7 1.9-3.3 4-4.2l-2.2-1.7Z" />
                  </svg>
                  <blockquote className="mt-5 flex-1 text-ink-700">
                    <p className="leading-relaxed">{testimonial.quote}</p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border-subtle pt-5">
                    <span className="block font-semibold text-ink-900">{testimonial.author}</span>
                    {testimonial.role || testimonial.organisation ? (
                      <span className="mt-0.5 block text-sm text-ink-500">
                        {[testimonial.role, testimonial.organisation].filter(Boolean).join(", ")}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
