# Hustle & Muscle — Gym Website

A frontend-only build of the Hustle & Muscle Fitness Gym website, made from the Figma file *Hustle-and-Muscle* (Homepage, Contact Us and Coaches frames).

Built with **Next.js (App Router)**, **React**, **TypeScript** and **Tailwind CSS v4**. No backend, no database — every page is statically generated, so it deploys to Vercel for free with zero config.

## Pages

| Route | Source |
| --- | --- |
| `/` | Figma "Homepage" — hero, partners, programs, classes, consultation, memberships, member stories |
| `/contact` | Figma "Contact Us" — how it works, inquiry form, map |
| `/coaches` | Figma "Coaches" — coach cards |
| `/about`, `/meal-plans`, `/supplements` | No design yet — styled "Coming Soon" placeholders so the nav doesn't 404 |

The newsletter and contact forms validate and show a success state but don't send anywhere yet (see *Next steps*).

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, **Add New → Project**, import the repo, keep every default, and click **Deploy**.

Or from the terminal: `npx vercel` (preview) and `npx vercel --prod`.

## Project structure

```
app/
  layout.tsx            Header + footer shell, metadata
  page.tsx              Homepage sections
  contact/              Contact page + client-side form
  coaches/              Coaches grid
  about | meal-plans | supplements   Placeholders
  globals.css           Tailwind v4 theme tokens (colors, type scale, chamfer shapes)
components/             Header, footer, buttons, cut-corner card, icons
lib/
  site.ts               Contact info, nav links, socials
  content.ts            Prices, programs, classes, coaches, testimonials
public/images/          Images exported from Figma
```

Most copy and every price lives in `lib/content.ts` and `lib/site.ts`, so updating the site is usually a one-file edit.

## Design tokens

All design values are named tokens in `app/globals.css` (`text-brand`, `text-section`, `tracking-display`, `max-w-site`, `chamfer`, …), so the markup uses canonical Tailwind classes only — no arbitrary `[px]` values.

## Next steps

- Wire the contact and newsletter forms to something real (a Next.js Server Action + Resend, Formspree, or a Google Sheet).
- Replace the placeholder social links in `lib/site.ts`.
- Swap the stock coach photos for real ones in `public/images/coach-*.jpg`.
- Design and build About, Meal Plans and Supplements.
