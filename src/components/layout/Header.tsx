"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

import { primaryNav } from "./nav";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Condense the header once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll, trap focus and support Escape while the menu is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Move focus into the panel for screen reader and keyboard users.
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-surface/90 shadow-header backdrop-blur-lg supports-[backdrop-filter]:bg-surface/80"
          : "bg-surface",
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-[4.5rem]" : "h-20 lg:h-24",
          )}
        >
          <Link
            href="/"
            className="shrink-0 rounded-lg"
            aria-label={`${company.legalName} — home`}
          >
            <Logo showTagline />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-colors duration-200",
                        active ? "text-brand-700" : "text-ink-700 hover:text-brand-700",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-600 transition-transform duration-300",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${company.primaryPhoneE164}`}
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-brand-700"
            >
              {company.phones[0]}
            </a>
            <ButtonLink href="/contact" size="sm">
              Request a Quote
            </ButtonLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative -mr-2 grid h-11 w-11 place-items-center rounded-xl text-ink-800 transition-colors hover:bg-brand-50 hover:text-brand-700 lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300",
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded bg-current transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300",
                  open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-border-subtle bg-surface lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="flex flex-col">
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-semibold transition-colors",
                      active ? "bg-brand-50 text-brand-700" : "text-ink-800 hover:bg-surface-muted",
                    )}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-ink-300">
                      &rsaquo;
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-col gap-3 border-t border-border-subtle pt-4">
            <ButtonLink href="/contact" className="w-full">
              Request a Quote
            </ButtonLink>
            <a
              href={`tel:${company.primaryPhoneE164}`}
              className="rounded-full px-4 py-3 text-center text-sm font-semibold text-ink-700 ring-1 ring-inset ring-ink-200 transition-colors hover:text-brand-700"
            >
              Call {company.phones[0]}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
