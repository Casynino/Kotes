import dynamic from "next/dynamic";
import Image from "next/image";

import { Counter } from "@/components/ui/Counter";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Icon } from "@/components/ui/Icon";
import { stats } from "@/content/about";
import { company } from "@/content/company";
import { photos } from "@/content/media";

/**
 * The globe is client-only and pulls in d3-geo: loading it dynamically keeps it
 * out of the initial JS payload so the hero text paints immediately. The
 * placeholder reserves the exact layout box, so there is no CLS on hydration.
 */
const WireframeGlobe = dynamic(
  () => import("@/components/ui/WireframeGlobe").then((m) => m.WireframeGlobe),
  {
    loading: () => (
      <div aria-hidden="true" className="aspect-square w-full">
        <div className="h-full w-full animate-pulse rounded-full bg-white/5 ring-1 ring-inset ring-white/10" />
      </div>
    ),
  },
);

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <HeroBackdrop />

      <div className="container-page relative">
        <div className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28 xl:py-32">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="animate-fade-in inline-flex items-center gap-2.5 rounded-full bg-white/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-200 ring-1 ring-inset ring-white/15 backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
              </span>
              Engineering Tanzania&rsquo;s networks since 1995
            </p>

            <h1 className="animate-fade-up text-display mt-6 text-white [animation-delay:80ms]">
              Infrastructure that keeps{" "}
              <span className="bg-gradient-to-r from-brand-300 via-brand-200 to-white bg-clip-text text-transparent">
                Tanzania connected
              </span>
            </h1>

            <p className="animate-fade-up text-lead mt-6 max-w-xl text-ink-200 [animation-delay:160ms]">
              {company.valueProposition}
            </p>

            <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:240ms]">
              <ButtonLink href="/projects" size="lg" variant="onDark">
                View Our Projects
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="outlineOnDark">
                Contact Us
              </ButtonLink>
            </div>

            <ul className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-ink-300 [animation-delay:320ms]">
              {["TCRA licensed", "CRB Class One contractor", "Government tender holder"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-brand-300" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-6">
            <div className="animate-fade-in relative mx-auto w-full max-w-[34rem] [animation-delay:120ms]">
              <WireframeGlobe />

              {/* Floating credential cards — hidden on small screens where they
                  would crowd the globe. */}
              <FloatingCard
                className="left-0 top-[12%] hidden sm:flex"
                icon="fiber"
                label="Fibre routes"
                value="National backbone"
                delay={520}
              />
              <FloatingCard
                className="right-0 top-[58%] hidden sm:flex"
                icon="headset"
                label="Emergency response"
                value="4-hour on-site"
                delay={660}
              />
              <FloatingCard
                className="bottom-[6%] left-[8%] hidden lg:flex"
                icon="shield"
                label="Uptime monitoring"
                value="24/7/365"
                delay={800}
              />
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="animate-fade-up relative border-t border-white/10 py-8 [animation-delay:400ms]">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      displayOverride={stat.displayOverride}
                    />
                  </span>
                  <span className="mt-1.5 block text-sm text-ink-300">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  icon,
  label,
  value,
  delay,
}: {
  className?: string;
  icon: "fiber" | "headset" | "shield";
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-fade-up absolute z-10 items-center gap-3 rounded-2xl bg-ink-900/80 px-4 py-3 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/12 backdrop-blur-md ${className}`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-500/20 text-brand-200">
        <Icon name={icon} className="h-4.5 w-4.5" strokeWidth={1.8} />
      </span>
      <span>
        <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
          {label}
        </span>
        <span className="block text-sm font-bold text-white">{value}</span>
      </span>
    </div>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Photographic base, heavily dimmed so it reads as texture rather than
          competing with the headline. Priority-loaded as the LCP candidate. */}
      <Image
        src={photos.datacenter.src}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950/97 via-ink-950/92 to-brand-950/85" />
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute -right-1/4 -top-1/3 h-[52rem] w-[52rem] rounded-full bg-brand-600/25 blur-3xl" />
      <div className="absolute -bottom-1/2 left-[-15%] h-[40rem] w-[40rem] rounded-full bg-brand-800/40 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
