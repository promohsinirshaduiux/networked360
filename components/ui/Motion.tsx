'use client';

import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: number;
  start?: string;
  id?: string;
};

/** Fades and lifts content into view once, when it scrolls into the viewport. */
export function Reveal({ children, as: Tag = 'div', className, style, delay = 0, y = 32, stagger, start = 'top 88%', id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.set(el, { opacity: 1 });
        gsap.from(targets, {
          opacity: 0,
          y,
          duration: 1.1,
          delay,
          stagger: stagger ?? 0,
          ease: 'expo.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: el, start, once: true },
        });
      });
      mm.add('(prefers-reduced-motion: reduce)', () => gsap.set(el, { opacity: 1 }));
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} data-reveal className={className} style={style} id={id}>
      {children}
    </Tag>
  );
}

type SplitProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Play immediately instead of on scroll (used in the hero). */
  immediate?: boolean;
};

/** Headline that reveals line by line from behind a mask. */
export function SplitReveal({ children, as: Tag = 'h2', className, delay = 0, immediate }: SplitProps) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: 'visible' });
            return gsap.from(self.lines, {
              yPercent: 112,
              rotate: 2,
              transformOrigin: '0% 100%',
              duration: 1.25,
              stagger: 0.09,
              delay,
              ease: 'expo.out',
              scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
            });
          },
        });
        return () => split.revert();
      });
      mm.add('(prefers-reduced-motion: reduce)', () => gsap.set(el, { visibility: 'visible' }));
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} data-split className={cn(className)}>
      {children}
    </Tag>
  );
}

/** Subtle magnetic pull toward the cursor on fine pointers. */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * strength);
        yTo((e.clientY - r.top - r.height / 2) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={cn('inline-flex will-change-transform', className)}>
      {children}
    </span>
  );
}
