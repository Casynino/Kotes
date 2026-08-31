/**
 * Input hardening applied after schema validation and before anything is
 * persisted, logged or embedded in an email.
 *
 * Control characters are filtered by code point rather than by regex escape so
 * the source stays free of literal control characters.
 */

const SPACE = " ";
const NEWLINE = "\n";

function isControlCode(code: number): boolean {
  // C0 controls (0-31) and DEL (127).
  return code < 32 || code === 127;
}

/** Strip every control character, including CR/LF used for header injection. */
export function stripControlChars(value: string): string {
  let out = "";
  for (const ch of value) {
    const code = ch.codePointAt(0) ?? 0;
    out += isControlCode(code) ? SPACE : ch;
  }
  return collapseSpaces(out).trim();
}

/** Strip control characters but preserve newlines — used for the message body. */
export function stripControlCharsKeepNewlines(value: string): string {
  let out = "";
  for (const ch of value.replace(/\r\n/g, NEWLINE)) {
    const code = ch.codePointAt(0) ?? 0;
    if (code === 10) out += NEWLINE;
    else out += isControlCode(code) ? SPACE : ch;
  }
  return out.replace(/[ \t]+\n/g, NEWLINE).replace(/\n{4,}/g, "\n\n\n").trim();
}

function collapseSpaces(value: string): string {
  return value.replace(/\s{3,}/g, "  ");
}

/** Escape for safe interpolation into HTML email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Reject values that could break out of an email header. */
export function isHeaderSafe(value: string): boolean {
  for (const ch of value) {
    const code = ch.codePointAt(0) ?? 0;
    if (code === 10 || code === 13) return false;
  }
  return true;
}

export function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max - 1)}…`;
}
