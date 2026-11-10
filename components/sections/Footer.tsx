'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUp, AtSign, BriefcaseBusiness, Camera, Mail, MapPin } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { scrollToTarget } from '@/lib/lenis';
import { cn } from '@/lib/cn';

// Links are placeholders until the inner pages exist, so they render as plain text (not clickable).
const COLS = [
  { h: 'Explore', links: ['Events', 'How it works', 'Upcoming', 'Success stories'] },
  { h: 'Company', links: ['About us', 'Host an event', 'Partnerships', 'Contact'] },
];

// Lucide has no brand marks, so neutral Lucide icons stand in; names live in aria-label / title.
const SOCIAL = [
  { icon: Camera, t: 'Instagram' },
  { icon: BriefcaseBusiness, t: 'LinkedIn' },
  { icon: AtSign, t: 'X' },
  { icon: Mail, t: 'Email' },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [fixed, setFixed] = useState(false);

  // Fixed "reveal" footer: the page scrolls away to uncover it. Only when it fits the viewport;
  // otherwise (short phones) it stays in the normal flow so every part stays reachable.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const measure = () => {
      const h = el.offsetHeight;
      const fits = h <= window.innerHeight - 40;
      setFixed(fits);
      root.style.setProperty('--footer-h', fits ? `${h}px` : '0px');
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      root.style.removeProperty('--footer-h');
    };
  }, []);

  // While it is being uncovered, the footer content rises gently into place.
  useGSAP(
    () => {
      if (!fixed) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const main = document.querySelector('main');
        if (!main) return;
        gsap.fromTo(
          '[data-footer-inner]',
          { y: () => -(ref.current?.offsetHeight ?? 0) * 0.3, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: main, start: 'bottom bottom', end: () => `+=${ref.current?.offsetHeight ?? 0}`, scrub: true, invalidateOnRefresh: true },
          },
        );
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [fixed] },
  );

  return (
    <footer ref={ref} className={cn('inset-x-0 bottom-0 z-0 w-full overflow-hidden bg-paper-2', fixed ? 'fixed' : 'relative')}>
      <div data-footer-inner className="container-x pt-16 pb-6 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-[1.6fr_0.7fr_0.7fr_auto] md:gap-x-10">
          {/* brand statement */}
          <div className="col-span-2 grid content-start gap-5 md:col-span-1">
            <p className="max-w-[16ch] font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.035em] text-ink">
              Real connections, <em className="text-gradient italic">seven minutes</em> at a time.
            </p>
            <p className="max-w-[40ch] leading-relaxed text-ink-3">Speed networking for business, careers, friendship and dating — online and in person.</p>
            <p className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-ink-2">
              <MapPin className="h-4 w-4 text-brand" /> New York · New Jersey · Online
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.h}>
              <h4 className="mb-5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-ink-4">{c.h}</h4>
              <ul className="grid gap-3">
                {c.links.map((t) => (
                  <li key={t}>
                    <span aria-disabled="true" className="cursor-default text-[1rem] text-ink-2">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-ink-4">Follow</h4>
            <ul className="flex gap-2">
              {SOCIAL.map(({ icon: Icon, t }) => (
                <li key={t}>
                  <span
                    role="img"
                    aria-label={t}
                    title={t}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line-2 bg-white text-ink-2 transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* full logo, edge to edge of the container — sized by width, so it is never cropped */}
        <div className="mt-14 md:mt-20">
          <Image
            src="/brand/logo-full.webp"
            alt="Networked360"
            width={2400}
            height={352}
            unoptimized
            loading="lazy"
            draggable={false}
            className="block h-auto w-full select-none"
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line-2 pt-6 text-[0.86rem] text-ink-4 sm:flex-row sm:items-center sm:justify-between md:mt-10">
          <span>© 2026 Networked360. All rights reserved.</span>
          <span className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span aria-disabled="true" className="cursor-default">
              Terms
            </span>
            <span aria-disabled="true" className="cursor-default">
              Privacy
            </span>
            <button
              onClick={() => scrollToTarget('#top', 0)}
              className="group inline-flex items-center gap-2 rounded-full border border-line-2 bg-white py-1.5 pr-1.5 pl-4 font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              Back to top
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-brand">
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}
