# Bachelors Finance Club — Website Spec

**Date:** 2026-09-10
**Owner:** Mel Ribadeau (CentraleSupélec, Bachelors Finance Club)

## Goal
A professional, black-and-white, finance-grade website for the Bachelors Finance
Club at CentraleSupélec. Inspired by https://bsic.it (editorial, monochrome,
content-driven). Bilingual FR/EN. Easy for non-developers to update.

## Stack
- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS**
- **next-intl** for FR/EN, URL-based routing (`/en/...`, `/fr/...`)
- **Articles**: Markdown/MDX files in `content/articles/` via `next-mdx-remote/rsc`
- **Contact form**: `/api/contact` route → **Resend** email; zod validation,
  honeypot spam trap, IP rate limiting
- **Deploy**: Vercel

## Pages (all bilingual)
- `/[locale]` — Home: hero, "what we do" pillars, featured articles, events teaser, join CTA
- `/[locale]/about` — mission, activities, history
- `/[locale]/team` — leadership + members grid (placeholder data in `content/team.ts`)
- `/[locale]/events` — upcoming & past events (`content/events.ts`)
- `/[locale]/articles` + `/[locale]/articles/[slug]` — article index + reader
- `/[locale]/contact` — contact form + join info

## Editable content (for non-developers)
- `content/team.ts` — people, roles, photos
- `content/events.ts` — events
- `content/articles/<slug>.<locale>.mdx` — articles (frontmatter + body)
- `messages/en.json`, `messages/fr.json` — all UI text

## Design language
Monochrome only: near-black `#0A0A0A`, white, greys. Serif display (Playfair
Display) headings over sans (Inter) body. Thin rules, generous whitespace,
uppercase tracked labels, subtle hover transitions. Sticky navbar with logo +
language toggle. Strong footer.

## Security
- Strict HTTP headers (CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy) in `next.config.mjs`
- Contact API: server-side zod validation, honeypot, in-memory IP rate limiting
- Secrets server-only (`.env.local`); `.env.example` committed
- No client-exposed keys

## Testing
Vitest + Testing Library: FR/EN message-key parity, article frontmatter parsing,
contact-form validation schema, component render smoke tests.

## Assets / TODO for owner
- Drop official CentraleSupélec logo into `public/` (current file is a saved
  Wikipedia webpage, not a usable logo).
- Fill real names/roles/photos in `content/team.ts`.
- Add real events in `content/events.ts`.
- Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in `.env.local` for the contact form.
