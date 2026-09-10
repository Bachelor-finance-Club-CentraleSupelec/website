# Bachelors Finance Club — Website

Bilingual (FR/EN), black-and-white, finance-professional website for the
Bachelors Finance Club at CentraleSupélec. Built with Next.js.

## Run it locally

```bash
npm install      # first time only
npm run dev      # then open http://localhost:3000
```

The site redirects to your language (`/en` or `/fr`).

## Common commands

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # run the production build
npm run test     # run the test suite
npm run lint     # lint
```

## Where to edit content (no coding needed)

| What | File |
| --- | --- |
| UI text (buttons, labels, headings) | `messages/en.json`, `messages/fr.json` |
| Team / members | `content/team.ts` |
| Events | `content/events.ts` |
| Articles | `content/articles/<slug>.en.mdx` + `<slug>.fr.mdx` |

### Adding an article
Create two files in `content/articles/`:
`my-article.en.mdx` and `my-article.fr.mdx`, each starting with:

```mdx
---
title: "My title"
date: "2026-09-10"
author: "Your name"
excerpt: "One-line summary shown on cards."
cover: ""
---

Your article body in Markdown…
```

## Contact form

The contact form emails the club via [Resend](https://resend.com).
Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=club-inbox@example.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

Until these are set, the form validates and responds gracefully but won't send.

## To-do for the owner

- Drop the official **CentraleSupélec logo** into `public/` (the provided
  `Fichier_LogoCS.htm` is a saved webpage, not a usable image).
- Replace placeholder people in `content/team.ts`.
- Update contact details in the footer and contact page.
- Add real social links in `src/components/Footer.tsx`.

## Deploy

Push to GitHub, import the repo on [Vercel](https://vercel.com), and add the
same environment variables in the Vercel project settings. Every push
redeploys automatically.

## Security

- Strict HTTP security headers (CSP, HSTS, X-Frame-Options, etc.) in `next.config.mjs`
- Contact API: server-side validation, honeypot spam trap, IP rate limiting
- Secrets live only in `.env.local` (git-ignored)
