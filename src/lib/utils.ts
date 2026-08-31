/** Join class names, dropping falsy values. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/** Absolute URL against the configured site origin. */
export function absoluteUrl(pathname: string, origin: string): string {
  return new URL(pathname, origin).toString();
}

export function formatDate(iso: string, locale = "en-GB"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(date);
}

/** Deterministic slug for anchors and ids. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
