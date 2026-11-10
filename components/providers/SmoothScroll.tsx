'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, motionOK } from '@/lib/gsap';
import { scrollToTarget, setLenis } from '@/lib/lenis';

/** Lenis smooth scrolling synced to GSAP's ticker, plus smooth in-page anchor links. */
export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;

    if (motionOK()) {
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      lenis.on('scroll', ScrollTrigger.update);
      tick = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
      if (process.env.NODE_ENV !== 'production') (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector<HTMLElement>(href);
      if (!el) return;
      e.preventDefault();
      // In-page only: smooth-scroll to the section without touching the URL or history.
      scrollToTarget(el);
    };
    document.addEventListener('click', onClick);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    // Keep pinned/scrubbed sections accurate when content height changes (filters, accordions, images).
    let t: ReturnType<typeof setTimeout>;
    let lastH = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => {
        const h = document.body.scrollHeight;
        if (Math.abs(h - lastH) > 2) {
          lastH = h;
          ScrollTrigger.refresh();
          lastH = document.body.scrollHeight;
        }
      }, 250);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      clearTimeout(t);
      document.removeEventListener('click', onClick);
      window.removeEventListener('load', refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
