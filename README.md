# KOTES (T) LIMITED — Corporate Website

Production-ready marketing site for KOTES (T) LIMITED, a Tanzanian ICT
infrastructure and systems integration company founded in 1995.

Built with **Next.js 15** (App Router), **React 19**, **TypeScript** and
**Tailwind CSS v4**.

---

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at http://localhost:3000. Everything works without configuration
except outbound email — see [Contact form and email](#contact-form-and-email).

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run globe:dots` | Regenerate the hero globe's halftone dot field |

> **Note:** do not run `npm run build` while `npm run dev` is running — they
> share the `.next` directory and the dev server will break. Stop dev first.

---

## Editing content

**No copy, phone number or project detail is hard-coded in a component.**
Everything lives in `src/content/`, typed against `src/content/types.ts`. Edit a
file there and the change flows to every page, the sitemap, the JSON-LD schema
and the email templates.

| File | Controls |
| --- | --- |
| `company.ts` | Company name, address, phones, email, hours, social links, SEO defaults |
| `services.ts` | The six service lines, their benefits, process steps and capabilities |
| `projects.ts` | Project portfolio and category filters |
| `clients.ts` | Client list shown on the home page and `/clients` |
| `partners.ts` | Global technology vendors shown in the partner marquee |
| `team.ts` | Leadership and key personnel |
| `testimonials.ts` | Client quotes (currently empty — the section hides itself) |
| `about.ts` | Mission, vision, values, milestones, certifications, statistics |
| `media.ts` | Photography registry: file paths and alt text |

### Common edits

**Change the phone number or address** — `src/content/company.ts`. It updates
the header, footer, contact page, map, JSON-LD and email footer at once.

**Add a service** — append to the `services` array in `services.ts` with a
unique `slug` and an `order`. A detail page at `/services/<slug>` is generated
automatically, along with its sitemap entry and `Service` schema.

**Hide something without deleting it** — set `active: false`. This works for
services, projects, clients, partners, team members and testimonials.

**Reorder anything** — change its `order` value (ascending).

**Add a project** — append to `projects` in `projects.ts`. Set
`clientConfidential: true` to mask the client name everywhere, or
`valueConfidential: true` to hide the contract value.

**Publish a testimonial** — `testimonials.ts` ships empty on purpose, so no
quote is attributed to a client without approval. Add an entry with
`active: true` and the section appears on the home page.

### Moving to a CMS later

Pages import from `@/content` only. To move to Sanity, Payload, Strapi or a
database, keep the types in `types.ts`, swap the exports in `src/content/index.ts`
for async loaders, and make the pages `async`. No component needs to change.

---

## Images

### Photography

Photos live in `public/images/photos/` and are **self-hosted, never hotlinked**.
They are currently licensed stock placeholders — see
`public/images/photos/CREDITS.md` for the source list and licence.

**To replace them with real KOTES photography:** drop new files in with the same
filenames. Nothing else changes. Recommended: 1800px on the long edge, JPEG
quality ~72, landscape. If the subject changes meaningfully, update the matching
`alt` text in `src/content/media.ts`.

Every image goes through `next/image`, so it is served as AVIF or WebP at the
right size for each breakpoint, and lazy-loaded except above the fold.

### Client logos

Client tiles currently render a typographic monogram. To use real artwork, drop
a file into `public/images/clients/` and set `logo` on the entry in
`clients.ts`:

```ts
{ id: "cl-tpa", name: "Tanzania Ports Authority", monogram: "TPA",
  logo: { src: "/images/clients/tpa.svg", alt: "Tanzania Ports Authority logo" },
  /* ... */ }
```

SVG or transparent PNG, around 240×120, works best. Until a logo is set the
monogram renders — so the grid never shows a broken image.

### Partner logos — read before launch

`src/content/partners.ts` lists global technology vendors. Two things need
confirming before this goes live:

1. **Trim the list** to vendors KOTES actually holds a reseller, partner or
   authorised-channel relationship with. Remove any that do not apply.
2. **Vendor logos are trademarks.** The tiles currently render text wordmarks,
   which carries no trademark risk. Only add a vendor's actual logo where your
   partner agreement permits it, using the official artwork from their brand
   assets page.

The section copy says "we source and deploy through authorised channels" rather
than claiming certified-partner status, which is the safer claim.

---

## Contact form and email

### How it works

1. The visitor submits the form at `/contact`.
2. `src/lib/validation.ts` validates in the browser — the same Zod schema the
   server uses, so the rules can never drift apart.
3. `POST /api/contact` re-validates from scratch (the client result is never
   trusted), applies anti-abuse checks, sanitises every field, then **stores the
   enquiry first and emails second**.
4. The visitor sees a confirmation with a reference number.

**A mail outage never loses a lead.** If SMTP is unconfigured or fails, the
enquiry is still stored, the visitor still sees success, and the failure is
written to the server log and recorded on the inquiry as `emailError`.

### Environment variables

All configuration is in `.env.example`, copied to `.env.local` for development
and set in your host's dashboard for production. Only `NEXT_PUBLIC_*` variables
reach the browser — **credentials never do**.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes, in production** | Canonical origin. Drives canonical URLs, sitemap, Open Graph and JSON-LD. **Must be present at build time** — see below |
| `SMTP_HOST` | For email | SMTP server hostname |
| `SMTP_PORT` | No | Defaults to `587` |
| `SMTP_SECURE` | No | Defaults to `true` on port 465, otherwise `false` |
| `SMTP_USER` | For email | SMTP username |
| `SMTP_PASSWORD` | For email | SMTP password or app password |
| `CONTACT_FROM_EMAIL` | No | Envelope sender. Defaults to `SMTP_USER` |
| `CONTACT_TO_EMAIL` | No | Where enquiries are delivered. Defaults to `company.email` |
| `CONTACT_REPLY_TO_VISITOR` | No | `false` to stop setting Reply-To to the visitor |
| `CONTACT_SEND_ACK` | No | `false` to stop the automatic acknowledgement to the visitor |
| `CONTACT_RATE_LIMIT` | No | Submissions per IP per window. Default `5` |
| `CONTACT_RATE_WINDOW_MS` | No | Window length. Default `600000` (10 minutes) |
| `INQUIRY_DATA_DIR` | No | Where enquiries are stored. Default `./data` |
| `INQUIRY_STORE` | No | `memory` to disable disk persistence |
| `ADMIN_API_TOKEN` | No | Enables the admin API. Minimum 24 characters |

> **`NEXT_PUBLIC_SITE_URL` is read at build time, not at runtime.** Next.js
> inlines `NEXT_PUBLIC_*` values into the bundle and most pages are
> pre-rendered, so setting it only when starting the server has no effect —
> canonical URLs, the sitemap and Open Graph tags would all point at the wrong
> origin. Make sure it is set in the environment that runs `npm run build`.
> On Vercel and Netlify, project environment variables are available at build
> time, so this happens automatically. On a self-hosted server, export it before
> building:
>
> ```bash
> NEXT_PUBLIC_SITE_URL=https://www.kotes.co.tz npm run build
> ```

Common SMTP settings:

| Provider | Host | Port |
| --- | --- | --- |
| Google Workspace | `smtp.gmail.com` | 587 (use an App Password) |
| Microsoft 365 | `smtp.office365.com` | 587 |
| cPanel / shared hosting | `mail.kotes.co.tz` | 465 or 587 |
| Amazon SES | `email-smtp.<region>.amazonaws.com` | 587 |

### Where enquiries are stored

The default store writes to `data/inquiries.json` (file mode `0600`, atomic
writes, serialised so concurrent submissions cannot interleave). It works on any
host with a writable disk and needs no extra services.

> **On serverless hosts (Vercel, Netlify) the filesystem is ephemeral and
> per-instance.** Stored enquiries will not survive a deploy. Either rely on
> email delivery alone (set `INQUIRY_STORE=memory` to make that explicit), or
> implement a database adapter.

**To use a real database:** implement the `InquiryStore` interface in
`src/lib/inquiries.ts` against Postgres, MySQL, MongoDB, Prisma or Supabase, and
change the `store` export at the bottom of that file. Nothing else in the app
touches storage.

### Inquiry status management

Each enquiry carries a status: `new` → `in_progress` → `contacted` → `closed`.

The admin API is headless, is not linked from the site, and returns `404` when
`ADMIN_API_TOKEN` is not configured — so an unconfigured deployment exposes
nothing.

```bash
# Generate a token
openssl rand -base64 36

# List all enquiries
curl -H "Authorization: Bearer $ADMIN_API_TOKEN" \
  https://www.kotes.co.tz/api/admin/inquiries

# Filter by status
curl -H "Authorization: Bearer $ADMIN_API_TOKEN" \
  "https://www.kotes.co.tz/api/admin/inquiries?status=new"

# Update a status
curl -X PATCH \
  -H "Authorization: Bearer $ADMIN_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"contacted"}' \
  https://www.kotes.co.tz/api/admin/inquiries/INQ-20260831-ABCD1234
```

---

## Security

| Concern | How it is handled |
| --- | --- |
| Input validation | Zod schema enforced on both client and server; the server re-parses the raw body and never trusts the client |
| XSS | React escapes by default. The only `dangerouslySetInnerHTML` is JSON-LD built from trusted content files, with `<` escaped |
| Email header injection | Control characters stripped from every field; subject and address checked for CR/LF before sending |
| Injection into storage | Select fields are checked against an allow-list, so only known values are ever persisted |
| Spam | Honeypot field, minimum time-to-submit, per-IP rate limiting, body-size and content-type checks |
| Abuse of the admin API | Bearer token with constant-time comparison, rate-limited, `404` when unconfigured |
| Secret exposure | All credentials in server-only environment variables; `src/lib/mailer.ts` and `src/lib/inquiries.ts` are marked `server-only` so they cannot be imported into client code |
| Error leakage | Visitors get generic messages; real errors go to the server log only |
| Transport | HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy` set in `next.config.ts` |

**CSRF:** the endpoint accepts only `application/json`, which browsers cannot
send cross-origin via a simple form post without a CORS preflight, and no
cookies or sessions are used for authentication. If you later add cookie-based
auth, add a CSRF token.

---

## Accessibility

- Semantic landmarks throughout, one `h1` per page, ordered headings
- Skip-to-content link
- Visible high-contrast focus rings on every interactive element
- Mobile menu traps focus, closes on Escape, returns focus to its toggle, and
  locks body scroll
- Form fields have real labels, `aria-invalid`, `aria-describedby` error
  associations, and focus moves to the first field with a problem
- Live result counts on the project filters announce to screen readers
- All animation respects `prefers-reduced-motion`
- Decorative images and graphics are hidden from assistive technology; content
  images carry meaningful alt text
- Content is never left invisible: reveal animations fall back to visible
  without JavaScript and have a timeout failsafe

---

## SEO

- Per-page title, description, canonical URL, Open Graph and Twitter card via
  `buildMetadata()` in `src/lib/seo.ts`
- Social sharing image generated at build time (`src/app/opengraph-image.tsx`)
- JSON-LD: `Organization` + `LocalBusiness` and `WebSite` site-wide, plus
  `BreadcrumbList`, `Service`, `CreativeWork` and `ItemList` where they apply
- `sitemap.xml` and `robots.txt` generated from the content layer, so they never
  go stale
- Clean URLs: `/about`, `/services`, `/services/<slug>`, `/projects`,
  `/projects/<slug>`, `/clients`, `/contact`

**Before launch:** set `NEXT_PUBLIC_SITE_URL` to the real origin, then submit
`https://www.kotes.co.tz/sitemap.xml` to Google Search Console.

---

## Performance

- 36 pages pre-rendered as static HTML at build time
- ~102 kB shared First Load JS; the heaviest page is ~135 kB
- Images served as AVIF/WebP at per-breakpoint sizes, lazy-loaded below the fold
- Fonts self-hosted and preloaded via `next/font`, so there is no render-blocking
  font request and no layout shift
- The hero globe is dynamically imported, so `d3-geo` stays out of the initial
  bundle; its halftone dot field is pre-computed at build time rather than
  calculated in the browser; it renders at a capped 40fps and pauses entirely
  when scrolled off-screen or the tab is hidden
- No analytics, tag manager or third-party scripts. The only third-party request
  on the whole site is the Google Maps iframe on `/contact`

---

## Deployment

### Vercel

Connect the repository, then set the environment variables in the project
settings. Build command and output are detected automatically. Set
`INQUIRY_STORE=memory` unless you have added a database adapter.

### Node server (VPS, Docker, cPanel with Node)

```bash
npm ci
npm run build
npm start          # listens on port 3000
```

Put Nginx or Caddy in front for TLS, and make sure it sets `X-Forwarded-For` so
rate limiting sees real client addresses. Keep `data/` writable and **outside**
the web root — it is already outside `public/`, and `.gitignore` excludes its
contents.

### Pre-launch checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to the live origin **in the build environment**, then confirm `https://www.kotes.co.tz/sitemap.xml` shows the real domain
- [ ] SMTP configured and a test enquiry received in the real inbox
- [ ] `ADMIN_API_TOKEN` set, or intentionally left unset
- [ ] Partner list trimmed to real relationships, logo permissions confirmed
- [ ] Real photography and client logos dropped in
- [ ] Social media URLs in `company.ts` corrected — some are placeholders and
      currently `active: false`
- [ ] Office coordinates in `company.ts` verified (currently approximate)
- [ ] Privacy policy and terms reviewed by a legal adviser against the Tanzania
      Personal Data Protection Act, 2022
- [ ] Sitemap submitted to Google Search Console

---

## Project structure

```
src/
  app/                     Routes (App Router)
    api/contact/           Public enquiry endpoint
    api/admin/inquiries/   Token-protected inquiry management
    opengraph-image.tsx    Social card, generated at build time
    sitemap.ts robots.ts   Generated from the content layer
  components/
    layout/                Header, footer, navigation
    sections/              Composable page sections
    projects/              Portfolio card and interactive browser
    contact/               Contact form
    ui/                    Primitives: Button, Card, Icon, Reveal, Globe...
    seo/                   JSON-LD renderer
  content/                 All site content — edit here, not in components
  lib/                     Validation, sanitisation, rate limiting, mail, storage, SEO
public/
  images/photos/           Self-hosted photography
  geo/                     Globe geometry and pre-computed dot field
scripts/
  generate-globe-dots.mjs  Build-time halftone dot generation
data/                      Enquiry store (git-ignored)
```

## Design system

All design tokens are declared in one `@theme` block at the top of
`src/app/globals.css`: colour scales, the fluid type scale, radii, shadows and
motion easings. No component contains a raw hex value, so rebranding is a matter
of editing that block.
