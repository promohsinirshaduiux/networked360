# Networked360 — landing page

A light-mode landing page for Networked360, the speed-networking platform.
- **Stack:** Next.js 16 (App Router), Tailwind CSS 4, GSAP 3 (ScrollTrigger, SplitText), Lenis smooth scroll and **Lucide** icons.
- **Brand:** color #009fd8 (`--color-brand` in `app/globals.css`; shades 50–700 sit beside it). Headings use Manrope (700 for headings, 800 for the hero and big numerals, 600 for long quotes; no italics, emphasis is carried by color) and body text uses DM Sans.

## Run
```bash
npm install
npm run dev      # http://localhost:5180
npm run build && npm start
```

## Sections (in order)
| Section | File | Highlights |
|---|---|---|
| Navbar | `sections/Navbar.tsx` | Full red logo; Home · Events · About Us · Contact Us. The active item is static: it changes only on click, never on scroll. Login + Get Started |
| Hero | `sections/hero/*` | Rounded 30px photo card (24px margin all round, starting below the navbar) with a navy overlay and white text; live countdown to the next room; headline lines reveal with an inline avatar stack and a drawn underline; arch portraits with a looping 7:00 → "It's a match" moment; rotating 360° rings; floating member chips; arches spread apart on scroll |
| Marquee | `sections/Marquee.tsx` | Crossed tapes that react to scroll speed and direction |
| Explore events | `sections/ExploreEvents.tsx` | Expanding panels: one open card, the others compact with vertical labels. Swipe cards on mobile |
| How it works | `sections/HowItWorks.tsx` | Vertical timeline; the spine fills and the spinning logo travels down it; content-sized cards with light Step pills; each step has its own small animation |
| Who you'll meet | `sections/Companies.tsx` | Role pills; 12 company logos (one per bubble) orbiting the spinning logo on two counter-rotating rings; bubbles and faces scale in place on hover. Logo grid on mobile |
| Upcoming events | `sections/UpcomingEvents.tsx` | 3 poster cards with calendar date badges and glass panels; they wipe in with parallax and show "starts in" and seat bars |
| Why Networked360 | `sections/WhyNetworked.tsx` | Draggable before/after comparison. Both layers share one full-width layout, so neither side is ever empty. Four pillar cards with different treatments |
| Success stories | `sections/Stories.tsx` | Featured story carousel with image wipes and progress, plus a strip of short quotes |
| Final CTA | `sections/FinalCTA.tsx` | Red panel with drifting outline type, pulsing rings, the spinning logo and nine orbiting faces on two rings |
| Contact | `sections/Contact.tsx` | Name, Email, Topic (select) and Message, with validation and a success state, plus contact details |
| Footer | `sections/Footer.tsx` | Fixed reveal footer (the page lifts away to uncover it; normal flow on short screens). Statement, location, Explore and Company columns (not clickable yet), icon-only socials, full-width red logo |

All copy and data lives in `lib/content.ts`. Navigation only scrolls within this page and never changes the URL (`ROUTES`). Footer links are plain text for now. Swap them for real routes when the inner pages exist.

## Responsive behavior
Tested at 320, 360, 375, 600, 667 (landscape), 768 and 1024 px, with no horizontal overflow, no text under 12px and 44px touch targets on phones.
- **Gutter:** one fluid `--gutter` variable (`app/globals.css`) drives the page container and the swipe carousel bleed, and respects notches (`viewport-fit=cover`, `env(safe-area-inset-*)`).
- **Touch:** `touch-action: manipulation` (no tap delay), 44px minimum targets on coarse pointers, form fields at 16px so iOS never zooms in, swipe carousels are keyboard-focusable regions.
- **Layout:** timeline uses one column below 1024px; the comparison cards use two columns on tablets; the comparison slider is replaced by stacked cards on phones; hero portraits scale to fit the gutters.
- **Mobile menu:** full-height (`dvh`), scrolls on short landscape screens, locks page scroll while open.
- **Reveal footer:** only on 768px and up when it fits the screen. Phones use a normal footer, because fixed positioning is unreliable with mobile browser toolbars.
- **Type:** headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

## Assets
- **Logo:** sources are in `brand-source/`.
  - `public/brand/icon-*.webp` come from "Red Logo.svg", re-centred so the mark sits exactly in the middle of the circle.
  - `public/brand/logo-full*.webp` are "Red Logo Name.png": the mark in #009fd8 and the "Networked360" wordmark in gray-900 (#111827), both recolors approved by the client; `icon-*.webp` are the round icon in the same blue.
  - `<LogoMark spin />` adds the quick 360° turn, pause and repeat.
- **Photos:** AI-generated with Higgsfield (model `gpt_image_2_6`), saved as the original PNGs in `public/images` with no extra compression (`images.unoptimized` is on in `next.config.ts`).
  - `people/` holds 3:4 portraits, `scenes/` holds the section, event and story photos, and `scenes/hero-bg.png` is the hero background.
  - They replaced the earlier Freepik placeholder photos. `scenes/cta-toast.jpg` and `scenes/online-call.jpg` are unused Freepik leftovers and can be deleted.
  - These are synthetic people, not real members. Check Higgsfield's terms for commercial use before launch.
- **Company logos:** official SVGs from Wikimedia Commons in `public/logos`. They are trademarks of their owners. Confirm you have the right to show them before launch.

## Placeholder content to replace before launch
- Upcoming events and success stories are sample data.
- The contact form and Get Started flow show success states only. Connect them to your backend or CRM.
- The social links point to the top of the page until real profile URLs are available.

## Motion
- Everything respects `prefers-reduced-motion`.
- Hover and parallax effects run only on fine pointers (mouse or trackpad).
- CTA buttons never move on hover; only their fill changes.

Earlier iterations are kept in `_archive/` and are not part of the build.
