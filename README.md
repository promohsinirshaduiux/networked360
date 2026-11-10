# Networked360 — landing page

A light-mode landing page for Networked360, the speed-networking platform.
- **Stack:** Next.js 16 (App Router), Tailwind CSS 4, GSAP 3 (ScrollTrigger, SplitText), Lenis smooth scroll and **Lucide** icons.
- **Brand:** color #D41A46. Headings use Fraunces and body text uses DM Sans.

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
| Hero | `sections/hero/*` | Live countdown to the next room; headline lines reveal with an inline avatar stack and a drawn underline; arch portraits with a looping 7:00 → "It's a match" moment; rotating 360° rings; floating member chips; arches spread apart on scroll |
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

## Assets
- **Logo:** sources are in `brand-source/`.
  - `public/brand/icon-*.webp` come from "Red Logo.svg", re-centred so the mark sits exactly in the middle of the circle.
  - `public/brand/logo-full-red*.webp` are "Red Logo Name.png" recoloured to #D41A46, which the client approved.
  - `<LogoMark spin />` adds the quick 360° turn, pause and repeat.
- **Photos:** free-license images from Freepik (magnific.com), in `public/images`.
  - Portraits are cropped to 3:4. The originals are in `_archive/source-photos`.
  - Freepik's free license **requires attribution**. The footer credit was removed at the client's request, so the site needs a Freepik Premium license, or the credit added back elsewhere, before launch.
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
