'use client';

import { useRef } from 'react';
import { Sparkle } from 'lucide-react';
import { MARQUEE } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/cn';

function Tape({ reverse, tone }: { reverse?: boolean; tone: 'brand' | 'light' }) {
  const words = [...MARQUEE, ...MARQUEE];
  return (
    <div
      className={cn(
        'flex overflow-hidden py-4 md:py-5',
        tone === 'brand' ? 'bg-brand text-white shadow-brand' : 'border-y border-brand-200 bg-white text-ink',
      )}
    >
      <div data-track data-dir={reverse ? -1 : 1} className="flex w-max shrink-0 items-center will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {words.map((w, k) => (
              <span key={`${dup}-${k}`} className="flex items-center">
                <span className={cn('px-5 font-display text-[clamp(1.6rem,3.4vw,2.9rem)] leading-none tracking-[-0.03em] whitespace-nowrap md:px-8', k % 2 === 1 && 'italic')}>
                  {w}
                </span>
                <Sparkle aria-hidden className={cn('h-5 w-5 shrink-0 fill-current md:h-6 md:w-6', tone === 'brand' ? 'text-white/70' : 'text-brand')} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two crossed tapes of networking phrases. They speed up and flip direction with your scroll. */
export default function Marquee() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tracks = gsap.utils.toArray<HTMLElement>('[data-track]');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;
      const tweens = tracks.map((t) => {
        const dir = Number(t.dataset.dir);
        return gsap.fromTo(t, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 40, ease: 'none', repeat: -1 });
      });
      let boost = { v: 1 };
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
          const dir = self.direction;
          tweens.forEach((tw) => tw.timeScale(dir));
          boost.v = Math.abs(v) + 1;
          gsap.to(boost, {
            v: 1,
            duration: 1.2,
            ease: 'power3.out',
            overwrite: true,
            onUpdate: () => tweens.forEach((tw) => tw.timeScale(dir * boost.v)),
          });
        },
      });
      return () => tweens.forEach((t) => t.kill());
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="What you can do on Networked360" className="relative overflow-hidden py-14 md:py-20">
      <div className="relative">
        <div className="-mx-[5vw] rotate-[2deg]">
          <Tape tone="light" reverse />
        </div>
        <div className="absolute inset-x-0 top-1/2 -mx-[5vw] -translate-y-1/2 -rotate-[2.5deg]">
          <Tape tone="brand" />
        </div>
      </div>
    </section>
  );
}
