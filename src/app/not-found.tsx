import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { primaryNav } from "@/components/layout/nav";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-ink-950 py-28 text-white lg:py-40">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl"
      />
      <div className="container-page relative text-center">
        <p className="font-display text-7xl font-extrabold text-brand-400">404</p>
        <h1 className="text-h1 mt-4 text-white">We could not find that page</h1>
        <p className="text-lead mx-auto mt-5 max-w-xl text-ink-300">
          The link may be out of date or the page may have moved. Here is where you can go instead.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" variant="onDark">
            Back to home
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="outlineOnDark">
            Contact us
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-12">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-300">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="font-semibold transition-colors hover:text-brand-300">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
