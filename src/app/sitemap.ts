import type { MetadataRoute } from "next";

import { site } from "@/content/company";
import { activeProjects } from "@/content/projects";
import { activeServices } from "@/content/services";

/** Generated at build time from the content layer, so it never goes stale. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/clients`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = activeServices.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = activeProjects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: new Date(project.completionDate),
    changeFrequency: "yearly",
    priority: project.featured ? 0.7 : 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
