/**
 * Renders a JSON-LD block.
 *
 * The payload is produced server-side from trusted content files, and `<` is
 * escaped so a stray sequence can never terminate the script element early.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
