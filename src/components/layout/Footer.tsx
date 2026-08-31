import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { company } from "@/content/company";
import { activeServices } from "@/content/services";

import { legalNav, primaryNav } from "./nav";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = company.socials.filter((s) => s.active);

  return (
    <footer className="bg-ink-950 text-ink-200">
      <div className="bg-grid">
        <div className="container-page py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-4">
              <Logo tone="dark" showTagline />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-300">
                {company.valueProposition}
              </p>

              {socials.length > 0 ? (
                <ul className="mt-7 flex items-center gap-3">
                  {socials.map((social) => (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-ink-200 ring-1 ring-inset ring-white/10 transition-all hover:bg-brand-600 hover:text-white hover:ring-brand-500"
                      >
                        <SocialIcon platform={social.platform} />
                        <span className="sr-only">{`${company.shortName} on ${social.label}`}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Quick links */}
            <nav aria-labelledby="footer-nav-heading" className="lg:col-span-2">
              <h2 id="footer-nav-heading" className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                Company
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-ink-300 transition-colors hover:text-brand-300">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services */}
            <nav aria-labelledby="footer-services-heading" className="lg:col-span-3">
              <h2 id="footer-services-heading" className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                Services
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {activeServices.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-ink-300 transition-colors hover:text-brand-300"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Get in touch</h2>
              <address className="mt-5 space-y-4 text-sm not-italic">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-ink-400">Head office</span>
                  <span className="mt-1 block text-ink-200">
                    {company.address.street}
                    <br />
                    {company.address.poBox}
                    <br />
                    {company.address.city}, {company.address.country}
                  </span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-ink-400">Phone</span>
                  {company.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="mt-1 block text-ink-200 transition-colors hover:text-brand-300"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-ink-400">Email</span>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-1 block text-ink-200 transition-colors hover:text-brand-300"
                  >
                    {company.email}
                  </a>
                </div>
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-brand-300">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <span>TIN {company.tin}</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
