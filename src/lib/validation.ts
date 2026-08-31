import { z } from "zod";

/**
 * Contact form schema — shared by the client component and the API route so
 * the browser and the server enforce exactly the same rules. The server never
 * trusts the client result; it re-parses the raw request body.
 */

const NAME_RE = /^[\p{L}\p{M}'’.\- ]+$/u;
// Digits, spaces, +, -, parentheses and dots.
const PHONE_RE = /^\+?[0-9\s().-]{7,25}$/;

export const budgetRanges = [
  "Under TZS 10M",
  "TZS 10M - 50M",
  "TZS 50M - 250M",
  "TZS 250M - 1B",
  "Over TZS 1B",
  "Not sure yet",
] as const;

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name must be 100 characters or fewer.")
    .regex(NAME_RE, "Please use letters, spaces, hyphens and apostrophes only."),

  companyName: z
    .string()
    .trim()
    .max(120, "Company name must be 120 characters or fewer.")
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "Email address is too long.")
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter your phone number.")
    .max(25, "Phone number is too long.")
    .regex(PHONE_RE, "Please enter a valid phone number, e.g. +255 756 529 083.")
    .refine((v) => (v.match(/\d/g) ?? []).length >= 7, "Phone number needs at least 7 digits."),

  serviceOfInterest: z
    .string()
    .trim()
    .min(1, "Please choose the service you are interested in.")
    .max(120),

  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject.")
    .max(150, "Subject must be 150 characters or fewer."),

  message: z
    .string()
    .trim()
    .min(20, "Please give us at least 20 characters so we can help properly.")
    .max(5000, "Message must be 5000 characters or fewer."),

  budgetRange: z.string().trim().max(60).optional().or(z.literal("")),

  consent: z
    .union([z.boolean(), z.literal("on"), z.literal("true")])
    .transform((v) => v === true || v === "on" || v === "true")
    .refine((v) => v === true, "Please accept the privacy policy to continue."),

  /** Honeypot — must stay empty. Hidden from real users and screen readers. */
  website: z.string().max(0, "Submission rejected.").optional().or(z.literal("")),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;

/** Field-keyed error map, e.g. { email: "Please enter a valid email address." } */
export type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactFormValues | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
