# Hustle & Muscle — Gym Website

A frontend-only build of the Hustle & Muscle Fitness Gym website, made from the Figma file *Hustle-and-Muscle* (Homepage, Contact Us and Coaches frames).

Built with **Next.js (App Router)**, **React**, **TypeScript** and **Tailwind CSS v4**. No backend, no database — every page is statically generated, so it deploys to Vercel for free with zero config.

## Pages

**From the Figma designs:** `/` (Homepage), `/contact` (Contact Us), `/coaches` (Coaches).

**Built in the same style (no Figma design yet):**

| Area | Routes |
| --- | --- |
| Packages | `/packages`, `/membership`, `/programs`, `/programs/[slug]`, `/classes` (weekly GX schedule), `/classes/[slug]` |
| Coaches | `/coaches/[slug]` profile for each coach |
| Shop | `/shop`, `/supplements`, `/merch`, `/shop/[slug]` product pages, `/cart`, `/checkout`, `/checkout/success` |
| Info | `/about`, `/why-hustle-and-muscle`, `/stories/alex`, `/meal-plans`, `/faqs`, `/refer-a-friend`, `/careers`, `/careers/[slug]` |
| Policies | `/club-rules`, `/privacy-policy`, `/cookie-policy`, `/terms` |

### Cart and checkout

Products, memberships, programs and GX class packs can all be added to one cart. The cart is saved in the browser (localStorage). Checkout collects contact details, pick-up or delivery, and a payment choice, then shows an order confirmation.

**No payment is processed and no order is sent anywhere yet.** To take real orders, connect a payment provider (for example PayMongo for GCash/Maya/cards) in `app/checkout/checkout-form.tsx` and send the order to a backend or email.

### Placeholder content to review

Everything outside the three Figma pages uses sample copy. Check it with the gym before going live:

- `lib/products.ts`: product names, prices, flavors and sizes (product images are SVG illustrations in `components/shop/product-art.tsx`)
- `lib/coaches.ts`: coach bios, years of experience, specialties, Facebook links
- `lib/training.ts`: the two extra programs, the two extra GX classes, class schedules and coach assignments
- `lib/faqs.ts`: policies such as freezes, returns and delivery fees
- `lib/legal.ts`: Club Rules, Privacy, Cookie and Terms text (a template, not legal advice)
- `app/refer-a-friend` and `lib/careers.ts`: referral reward and job openings
- `app/stories/alex/page.tsx`: Alex's written interview (set `videoUrl` there to embed a real video)

### Links that appear once you add them

- Footer social icons show only when you add URLs to `site.socials` in `lib/site.ts`.
- A coach's "View Facebook" button shows only when their `facebook` field in `lib/coaches.ts` is filled in. Until then the button is "Book a Session".

### Pre-filled contact form

Buttons like *Book a Free Assessment* or *Book a Session* link to `/contact` with the topic and subject filled in, using `contactHref()` from `lib/site.ts`.

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
  coaches/[slug] programs/ classes/ membership/ shop/ cart/ checkout/   Detail, shop and cart pages
  faqs | careers | refer-a-friend | why-hustle-and-muscle | about | meal-plans | supplements | merch
  club-rules | privacy-policy | cookie-policy | terms
  globals.css           Tailwind v4 theme tokens (colors, type scale, chamfer shapes)
components/             Header, footer, buttons, cut-corner card, icons, cart, shop, forms
lib/
  site.ts               Contact info, nav and footer links, socials
  content.ts            Homepage, About and Meal Plans copy, testimonials
  coaches.ts            Coach profiles
  training.ts           Programs, GX classes, memberships and prices
  products.ts           Shop catalog
  faqs.ts, legal.ts     FAQ answers and policy pages
public/images/          Images exported from Figma
```

All copy and prices live in `lib/`, so updating the site is usually a one-file edit.

## Animation

All motion respects the visitor's "reduce motion" setting, which turns it off completely.

| Layer | Where | How |
| --- | --- | --- |
| Hover and press | Buttons (arrow nudges, press shrink), nav underline, dropdowns, cards lift with an orange glow, product and coach photos zoom | Tailwind transitions |
| Scroll reveal | Headings, cards and lists ease up as they enter the screen, with a stagger inside grids | Add `data-reveal` to an element, or `data-reveal-group` to a list to stagger its children (`components/motion/reveal-observer.tsx`) |
| Page entrance | Hero headlines slide up word by word, the photo settles from a slow zoom, then the text and buttons fade in. Every page fades in on navigation | `SplitWords`, `animate-hero-zoom`, `app/template.tsx` |
| Numbers | "500+ members", "10+ companies" and About stats count up | `CountUp` |
| Signature motion | Partner logos scroll in an endless strip, orange glows breathe, the play button pulses, hero photos drift slower than the page, an orange progress bar tracks scrolling, the header shrinks and hides on scroll down then returns on scroll up, the cart badge pops when you add an item | `Marquee`, `animate-glow`, `parallax`, `scroll-progress`, `site-header.tsx` |

Timings and keyframes live in `app/globals.css` under *Motion*.

## Design tokens

All design values are named tokens in `app/globals.css` (`text-brand`, `text-section`, `tracking-display`, `max-w-site`, `chamfer`, …), so the markup uses canonical Tailwind classes only — no arbitrary `[px]` values.

## Next steps

- Connect checkout to real payments (see *Cart and checkout*).
- Wire the contact, newsletter, referral and careers forms to something real (a Next.js Server Action + Resend, Formspree, or a Google Sheet).
- Add the gym's social links in `lib/site.ts` and coach Facebook links in `lib/coaches.ts`.
- Swap the stock coach photos for real ones in `public/images/coach-*.jpg`.
