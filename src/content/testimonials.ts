import type { Testimonial } from "./types";

/**
 * Client testimonials.
 *
 * Intentionally empty: no approved client quotes have been supplied. The
 * testimonials section detects an empty list and hides itself, so the page
 * stays clean until real, attributable quotes are available.
 *
 * To publish one, add an entry below with `active: true`. Only publish quotes
 * you have written permission to attribute.
 */
export const testimonials: Testimonial[] = [];

export const activeTestimonials = testimonials
  .filter((t) => t.active)
  .sort((a, b) => a.order - b.order);
