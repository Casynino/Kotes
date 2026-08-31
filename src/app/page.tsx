import type { Metadata } from "next";

import { AboutIntro } from "@/components/sections/AboutIntro";
import { CTASection } from "@/components/sections/CTASection";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { site } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: site.defaultTitle,
  description: site.defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <AboutIntro />
      <ServicesPreview />
      <FeaturedProjects />
      <PartnerLogos />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
