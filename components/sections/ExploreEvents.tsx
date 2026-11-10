'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeftRight, ArrowUpRight, CalendarClock } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { EXPLORE, ROUTES, type ExploreCategory } from '@/lib/content';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/cn';

const pad = (n: number) => String(n).padStart(2, '0');

function Panel({ c, k, open }: { c: ExploreCategory; k: number; open: boolean }) {
  const Icon = c.icon;
  return (
    <>
      <Image
        src={c.img}
        alt=""
        fill
        sizes="(max-width: 1024px) 85vw, 640px"
        className={cn('object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)]', open ? 'scale-100' : 'scale-[1.15]')}
      />
      <div className={cn('absolute inset-0 transition-opacity duration-700', open ? 'bg-gradient-to-t from-black/85 via-black/25 to-black/10' : 'bg-black/50')} />

      {/* top row */}
      <div className="absolute inset-x-4 top-4 flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-float" style={{ color: c.color }}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className={cn('rounded-full bg-black/30 px-3 py-1.5 text-[0.75rem] font-medium tabular-nums text-white backdrop-blur-md transition-opacity duration-500', open ? 'opacity-100' : 'opacity-0')}>
          {pad(k + 1)} / {pad(EXPLORE.length)}
        </span>
      </div>

      {/* collapsed: vertical label (desktop only) */}
      <span
        aria-hidden
        className={cn(
          'absolute bottom-7 left-1/2 hidden -translate-x-1/2 rotate-180 items-center gap-3 font-display font-bold text-[1.3rem] leading-none whitespace-nowrap text-white transition-opacity duration-300 [writing-mode:vertical-rl] lg:flex',
          open ? 'opacity-0' : 'opacity-100 delay-300',
        )}
      >
        {c.name}
        <span className="font-sans text-[0.75rem] font-semibold tabular-nums text-white/60">{pad(k + 1)}</span>
      </span>

      {/* expanded content */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 grid gap-3 p-6 text-left text-white transition-[opacity,translate] duration-700 ease-[var(--ease-expo)] md:p-8',
          open ? 'translate-y-0 opacity-100 delay-200' : 'pointer-events-none translate-y-6 opacity-0',
        )}
      >
        <span className="text-[0.75rem] font-semibold uppercase leading-snug tracking-[0.12em] text-white/75">{c.tagline}</span>
        <h3 className="font-display font-bold text-[clamp(1.75rem,2.6vw,2.4rem)] leading-[1.08] tracking-[-0.03em]">{c.name}</h3>
        <p className="max-w-[34ch] text-[1rem] leading-relaxed text-white/85">{c.body}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-white/15 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.8rem] font-medium backdrop-blur-md">
            {c.sides[0]} <ArrowLeftRight className="h-3.5 w-3.5 text-brand-200" /> {c.sides[1]}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.8rem] font-medium backdrop-blur-md">
            <CalendarClock className="h-3.5 w-3.5 text-brand-200" /> Next · {c.next}
          </span>
          <span className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </>
  );
}

export default function ExploreEvents() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-panel]', {
          yPercent: 14,
          opacity: 0,
          duration: 1.2,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-panels]', start: 'top 82%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="events" className="py-20 md:py-32">
      <div className="container-x">
        <SectionHeading
          align="split"
          eyebrow="Explore events"
          title={
            <>
              One format. <em className="text-gradient">Every</em> kind of room.
            </>
          }
          lead="Short conversations, private choices, mutual connections — the same simple rules in every room."
          aside={
            <ButtonLink href={ROUTES.upcoming} variant="outline" arrow className="justify-self-start lg:justify-self-end">
              See upcoming events
            </ButtonLink>
          }
        />

        {/* Desktop: expanding panels — one open, the rest compact */}
        <div data-panels className="hidden h-[580px] gap-3 lg:flex">
          {EXPLORE.map((c, k) => {
            const open = active === k;
            return (
              <button
                key={c.id}
                type="button"
                data-panel
                onMouseEnter={() => setActive(k)}
                onFocus={() => setActive(k)}
                onClick={() => setActive(k)}
                aria-expanded={open}
                aria-label={`${c.name} — ${c.tagline}`}
                className={cn(
                  'group relative min-w-0 cursor-pointer overflow-hidden rounded-[28px] bg-paper-3 shadow-soft transition-[flex-grow] duration-[900ms] ease-[var(--ease-expo)]',
                  open ? 'grow-[7]' : 'grow',
                )}
                style={{ flexBasis: 0 }}
              >
                <Panel c={c} k={k} open={open} />
              </button>
            );
          })}
        </div>

        {/* Mobile & tablet: swipe carousel */}
        <div data-panels role="region" aria-label="Event categories, swipe to browse" tabIndex={0} className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto overscroll-x-contain px-[var(--gutter)] pb-2 lg:hidden">
          {EXPLORE.map((c, k) => (
            <article key={c.id} data-panel className="group relative h-[min(500px,72svh)] min-h-[440px] w-[82vw] max-w-[420px] shrink-0 snap-center overflow-hidden rounded-[28px] bg-paper-3 shadow-soft">
              <Panel c={c} k={k} open />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
