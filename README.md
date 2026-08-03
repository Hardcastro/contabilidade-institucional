# Meridiano Contabilidade

> **Resumo em português:** site institucional fictício para um escritório de contabilidade, construído como peça de portfólio. O ponto central é o formulário de contato — validado nas duas pontas (cliente e servidor), com anti-spam por honeypot e limite de envios por IP, destino real por e-mail (Resend) e acessível de ponta a ponta. Stack: Next.js 15 (App Router), Tailwind CSS v4 e TypeScript em modo strict.

A complete institutional website for a fictional accounting firm — a portfolio piece built to show two things at once: a marketplace-ready finish, and a contact form built the way a contact form should be built.

## What this is

Meridiano Contabilidade is a fictional accounting firm in São Paulo. The site has five routes (home, services, office/team, plans, contact) and a single visual system — "clay + glass" — shared across every page. All content is fictional; see [site.config.ts](./site.config.ts) for the single file that holds it.

## Demo

Deployed on Vercel: [contabilidade-institucional.vercel.app](https://contabilidade-institucional.vercel.app)

## Stack

- **Next.js 15** — App Router, TypeScript in strict mode
- **Tailwind CSS v4** — CSS-first configuration (`@theme` block in `app/globals.css`, no `tailwind.config.js`)
- **Resend** — contact-form email delivery
- **Inter** — via `next/font/google`
- Hand-written inline SVG icons — no icon library
- No other runtime dependencies

## Running it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The project runs and the contact form works end to end with zero configuration: in development, without `RESEND_API_KEY`, the API route logs the submission to the console and returns a simulated success.

**Simulation never happens by accident in production.** Deployed without a key, the API route answers `502` and the form shows the phone number and e-mail address instead — a contact form that reports success without delivering is worse than one that is honestly broken, because the visitor stops waiting for a reply that will never come. To run a production build with no secrets on purpose (a demo, a clone), set `CONTACT_SIMULATE=1`.

### Environment variables

See [.env.example](./.env.example).

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | **In production, yes** | Resend API key. Absent in development, sending is simulated and logged. Absent in production, the form fails loudly. |
| `CONTACT_SIMULATE` | No | Set to `1` to allow simulated sending even in production. Escape hatch for demos and clones. |
| `CONTACT_TO` | No | Destination address for contact-form submissions. Falls back to the address in `site.config.ts`. |
| `NEXT_PUBLIC_SITE_URL` | No | Public deployment URL, used for `metadataBase`, Open Graph tags and `sitemap.ts`. Update after deploying. |

## What this project demonstrates

**The contact form is the centerpiece.** Everything else in the codebase supports it or stays out of its way.

- **Shared validation, one source of truth.** [`lib/validation.ts`](./lib/validation.ts) exports the rules used by both the client (validated on blur, per field) and the server (revalidated from scratch on submit). The client never gets to decide what's valid — the API route trusts nothing it receives.
- **Anti-spam without punishing real users.** A honeypot field is hidden from sighted users via CSS, removed from the tab order (`tabIndex={-1}`), and hidden from assistive technology (`aria-hidden="true"`) — so a screen reader user never lands on a field that makes no sense. Bots that fill every input regardless of visibility get caught, and the API route rejects the submission. On top of that, [`lib/rateLimit.ts`](./lib/rateLimit.ts) caps submissions at 5 per IP per 10 minutes — in-memory, with a comment marking where a real multi-instance deployment would swap in shared storage (Redis, Upstash, etc.).
- **The Resend client is built inside the request handler**, not at module scope ([`lib/mailer.ts`](./lib/mailer.ts)). Instantiating it at import time would make `npm run build` fail whenever `RESEND_API_KEY` is absent — which defeats the point of a project that should clone and run with zero secrets configured.
- **Failure is reported as failure.** Two things used to be swallowed: a missing API key returned a simulated success, and the Resend SDK resolves with `{ data, error }` rather than rejecting, so an awaited-but-unchecked send hid a refused delivery the same way. Both now throw ([`MailNotConfiguredError`, `MailDeliveryError`](./lib/mailer.ts)), and the API route turns them into a `502` carrying a fallback the visitor can act on immediately — the office phone and e-mail. Simulation survives where it is useful (development, or `CONTACT_SIMULATE=1`) and nowhere else.
- **Accessible by construction, not by afterthought.** Every field has an associated `<label>`, `aria-invalid` and `aria-describedby` on error, a `noValidate` form with real validation logic instead of relying on browser defaults, focus moved to the first invalid field on submit, and an `aria-live="polite"` region announcing the result.
- **A reusable visual spine.** [`components/base/`](./components/base) — `primitives.tsx`, `Header.tsx`, `Footer.tsx`, `ContactForm.tsx`, `Icons.tsx` — knows nothing about accounting. Every label and content string arrives through props or through [`site.config.ts`](./site.config.ts), so the same spine can carry a different business in a future project.
- **The "clay + glass" design system enforces its own limits.** Glass (translucent, blurred) surfaces only ever carry short, single-line chrome — the sticky header, a numbers strip. Anything with more than one line of text — paragraphs, the contact form, the pricing comparison table — sits on a solid or near-solid surface, because translucent glass under running text fails contrast as soon as the background changes. Across every route, at most two `backdrop-filter` elements are ever visible in the same viewport at once (the sticky header, plus one numbers panel on the home and office pages) — comfortably under the self-imposed budget of three.

## License

MIT — see [LICENSE](./LICENSE).
