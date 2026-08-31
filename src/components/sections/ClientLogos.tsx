import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { activeClients } from "@/content/clients";
import type { Client } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Logo tile.
 * Renders the real logo when one is configured, otherwise a typographic
 * monogram — so the grid never shows a broken or missing image.
 */
export function ClientTile({ client, className }: { client: Client; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-24 items-center justify-center rounded-xl bg-surface px-4 ring-1 ring-border-subtle transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card hover:ring-brand-200",
        className,
      )}
    >
      {client.logo ? (
        <Image
          src={client.logo.src}
          alt={client.logo.alt}
          width={client.logo.width ?? 200}
          height={client.logo.height ?? 80}
          loading="lazy"
          className="max-h-14 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
        />
      ) : (
        <span className="text-center">
          <span className="block font-display text-lg font-extrabold tracking-tight text-brand-800">
            {client.monogram}
          </span>
          <span className="mt-0.5 block text-[0.6875rem] leading-tight text-ink-500">
            {client.shortName ?? client.name}
          </span>
        </span>
      )}
    </div>
  );
}

export function ClientLogos() {
  const shown = activeClients.slice(0, 12);

  if (shown.length === 0) return null;

  return (
    <Section labelledBy="clients-heading" tone="sunken" spacing="md">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <h2 id="clients-heading" className="text-h3 text-ink-900">
              Trusted by ministries, authorities and enterprises
            </h2>
            <p className="mt-2 text-ink-600">
              {activeClients.length}+ institutions across government, transport, education, health and energy.
            </p>
          </div>
          <ButtonLink href="/clients" variant="secondary" className="shrink-0 self-center md:self-auto">
            View all clients
            <ArrowRight />
          </ButtonLink>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {shown.map((client, index) => (
            <li key={client.id}>
              <Reveal delay={index * 40}>
                <ClientTile client={client} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
