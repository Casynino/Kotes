import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type { ImageRef } from "@/content/types";

/**
 * Shared hero for interior pages: breadcrumb, title, lead paragraph and an
 * optional photographic backdrop. Keeps every page opening visually identical.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  image?: ImageRef;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {image ? (
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/88 to-brand-950/75" />
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="absolute -right-1/4 -top-1/2 h-[40rem] w-[40rem] rounded-full bg-brand-600/20 blur-3xl" />
      </div>

      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-400">
            {breadcrumbs.map((crumb, index) => (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-ink-600">
                    /
                  </span>
                ) : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-brand-300">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink-200">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">{eyebrow}</p>
        <h1 className="text-h1 mt-4 max-w-4xl text-white">{title}</h1>
        {description ? (
          <p className="text-lead mt-5 max-w-2xl text-ink-200">{description}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
