import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { activeTechnologyPartners } from "@/content/partners";
import type { Client } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Vendor wordmark tile.
 *
 * Renders official artwork when `logo` is configured, otherwise a typographic
 * wordmark — which looks deliberate rather than broken, and carries no
 * trademark risk before logo usage is cleared with each vendor.
 */
export function PartnerTile({ partner, tone = "dark" }: { partner: Client; tone?: "dark" | "light" }) {
  return (
    <div
      className={cn(
        "flex h-20 min-w-[11rem] shrink-0 items-center justify-center gap-3 rounded-xl px-6 transition-all duration-300",
        tone === "dark"
          ? "bg-white/5 ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:ring-brand-400/40"
          : "bg-surface ring-1 ring-border-subtle hover:ring-brand-200 hover:shadow-card",
      )}
    >
      {partner.logo ? (
        <Image
          src={partner.logo.src}
          alt={partner.logo.alt}
          width={partner.logo.width ?? 160}
          height={partner.logo.height ?? 48}
          loading="lazy"
          className="max-h-9 w-auto object-contain"
        />
      ) : (
        <span className="text-center">
          <span
            className={cn(
              "block font-display text-sm font-extrabold tracking-[0.08em]",
              tone === "dark" ? "text-white/90" : "text-ink-900",
            )}
          >
            {partner.monogram}
          </span>
          {partner.industry ? (
            <span
              className={cn(
                "mt-1 block text-[0.625rem] font-medium uppercase tracking-[0.1em]",
                tone === "dark" ? "text-brand-200/70" : "text-ink-500",
              )}
            >
              {partner.industry}
            </span>
          ) : null}
        </span>
      )}
    </div>
  );
}

/**
 * Infinite marquee of vendor wordmarks.
 *
 * The list is rendered twice so the CSS translate loop is seamless; the
 * duplicate is hidden from assistive technology. The animation pauses on hover
 * and is disabled entirely under prefers-reduced-motion (handled globally in
 * globals.css), where the row simply becomes horizontally scrollable.
 */
export function PartnerLogos({
  tone = "dark",
  heading = "Global technology behind local delivery",
  description = "We source, supply and deploy through authorised channels for the enterprise brands that power government and corporate ICT worldwide.",
}: {
  tone?: "dark" | "light";
  heading?: string;
  description?: string;
}) {
  const partners = activeTechnologyPartners;
  if (partners.length === 0) return null;

  return (
    <Section
      labelledBy="partners-heading"
      tone={tone === "dark" ? "dark" : "muted"}
      spacing="md"
      className="overflow-hidden"
    >
      {tone === "dark" ? (
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      ) : null}

      <div className="relative">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.16em]",
                tone === "dark" ? "text-brand-300" : "text-brand-700",
              )}
            >
              Technology partners &amp; vendors
            </p>
            <h2
              id="partners-heading"
              className={cn("text-h2 mt-4", tone === "dark" ? "text-white" : "text-ink-900")}
            >
              {heading}
            </h2>
            <p className={cn("mt-4", tone === "dark" ? "text-ink-300" : "text-ink-600")}>{description}</p>
          </Reveal>
        </div>

        {/* Marquee */}
        <div className="group relative mt-12">
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32",
              tone === "dark"
                ? "bg-gradient-to-r from-ink-950 to-transparent"
                : "bg-gradient-to-r from-surface-muted to-transparent",
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32",
              tone === "dark"
                ? "bg-gradient-to-l from-ink-950 to-transparent"
                : "bg-gradient-to-l from-surface-muted to-transparent",
            )}
          />

          <div className="overflow-x-auto motion-safe:overflow-hidden">
            <ul className="flex w-max gap-4 motion-safe:animate-marquee motion-safe:group-hover:[animation-play-state:paused]">
              {partners.map((partner) => (
                <li key={partner.id}>
                  <PartnerTile partner={partner} tone={tone} />
                </li>
              ))}
              {/* Seamless loop duplicate — decorative only. */}
              {partners.map((partner) => (
                <li key={`${partner.id}-dup`} aria-hidden="true">
                  <PartnerTile partner={partner} tone={tone} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-page">
          <Reveal
            className={cn(
              "mx-auto mt-10 max-w-3xl text-center text-sm",
              tone === "dark" ? "text-ink-400" : "text-ink-500",
            )}
          >
            <p>
              Equipment is procured through authorised distribution channels with valid manufacturer
              warranty and full technical compliance documentation for public procurement.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
