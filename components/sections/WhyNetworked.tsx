'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import { BadgeCheck, Check, CheckCheck, ChevronsLeftRight, Clock3, EyeOff, Ghost, Lock, MapPin, MessagesSquare, Smartphone, Sunrise, UserX, Video, X } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { LogoMark } from '@/components/ui/Logo';
import { PEOPLE } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/cn';

type Item = { icon: typeof Clock3; t: string; d: string };

const OLD_WAY: Item[] = [
  { icon: Smartphone, t: 'Endless swiping', d: 'Profiles that never become a conversation.' },
  { icon: MessagesSquare, t: 'Weeks of messaging', d: 'Small talk in an inbox before you meet.' },
  { icon: UserX, t: 'Who is this, really?', d: 'Unverified profiles and filtered photos.' },
  { icon: Ghost, t: 'Awkward rejections', d: 'Left on read, or ghosted entirely.' },
];
const NEW_WAY: Item[] = [
  { icon: Clock3, t: 'Seven-minute conversations', d: 'Face to face, you know within minutes.' },
  { icon: BadgeCheck, t: 'Verified humans only', d: 'Every member is checked by a real person.' },
  { icon: EyeOff, t: 'Private until mutual', d: 'Nobody sees who you passed on.' },
  { icon: Sunrise, t: 'Matches by morning', d: 'Details shared when you both say yes.' },
];
const FACES = [PEOPLE.priya, PEOPLE.marcus, PEOPLE.zoe, PEOPLE.kenji, PEOPLE.elena];

/*
 * Both layers share the exact same full-width layout, so wherever the divider sits,
 * each side is filled edge to edge — item 1 of the old way sits exactly under item 1 of the new way.
 */
function Layer({ kind }: { kind: 'old' | 'new' }) {
  const isNew = kind === 'new';
  const items = isNew ? NEW_WAY : OLD_WAY;
  return (
    <div className={cn('absolute inset-0 flex flex-col justify-between p-8 lg:p-10', isNew ? 'bg-brand text-white' : 'bg-paper-2 text-ink')}>
      <div
        aria-hidden
        className={cn('absolute inset-0 [background-size:22px_22px]', isNew ? 'opacity-[0.12] [background-image:radial-gradient(#fff_1px,transparent_1px)]' : 'opacity-60 [background-image:radial-gradient(rgb(23_20_26/0.08)_1px,transparent_1px)]')}
      />

      {/* top row: label + headline (left), status chips (right) */}
      <div className="relative flex items-start justify-between gap-8">
        <div className="grid max-w-[560px] gap-4">
          <span className={cn('h-7 text-[0.75rem] font-semibold uppercase tracking-[0.16em]', isNew ? 'text-white/80' : 'invisible')}>
            {isNew && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5">
                <Check className="h-3.5 w-3.5" strokeWidth={3} /> The Networked360 way
              </span>
            )}
          </span>
          <p className={cn('font-display font-bold text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.035em]', !isNew && 'text-ink-3')}>
            {isNew ? (
              <>
                Meet, talk, <em>say yes.</em>
              </>
            ) : (
              'Swipe, wait, repeat.'
            )}
          </p>
        </div>
        <div className="grid shrink-0 justify-items-end gap-2">
          <span className={cn('h-7 text-[0.75rem] font-semibold uppercase tracking-[0.16em]', isNew ? 'invisible' : 'text-ink-4')}>
            {!isNew && (
              <span className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-white/70 px-3 py-1.5">
                <X className="h-3.5 w-3.5" strokeWidth={3} /> The old way
              </span>
            )}
          </span>
          {isNew ? (
            <>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[0.82rem] font-semibold text-ink shadow-float">
                <Clock3 className="h-4 w-4 text-brand" /> 7:00 · next round
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 text-[0.82rem] font-semibold backdrop-blur">
                <CheckCheck className="h-4 w-4" /> It’s a match
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[0.82rem] font-medium text-ink-4 shadow-soft">
                <MessagesSquare className="h-4 w-4" /> typing…
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3.5 py-2 text-[0.82rem] font-medium text-ink-4">
                <CheckCheck className="h-4 w-4" /> Seen · 2 days ago
              </span>
            </>
          )}
        </div>
      </div>

      {/* bottom row: four cards across the full width */}
      <ul className="relative grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map(({ icon: Icon, t, d }) => (
          <li key={t} className={cn('grid min-h-[164px] content-start gap-3 rounded-[22px] p-5 lg:min-h-[184px] xl:min-h-[160px]', isNew ? 'bg-white text-ink shadow-float' : 'border border-line bg-white/60')}>
            <span className={cn('grid h-10 w-10 place-items-center rounded-xl', isNew ? 'bg-brand-50 text-brand' : 'bg-paper-3 text-ink-4')}>
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <b className={cn('block font-semibold leading-snug', isNew ? 'text-ink' : 'text-ink-3 line-through decoration-ink-4/60')}>{t}</b>
              <span className={cn('mt-1 block text-[0.86rem] leading-snug', isNew ? 'text-ink-3' : 'text-ink-4')}>{d}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhyNetworked() {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const pos = useRef({ v: 50 });

  const apply = useCallback(() => {
    const el = stage.current;
    if (!el) return;
    el.style.setProperty('--split', `${pos.current.v}%`);
    el.setAttribute('aria-valuenow', String(Math.round(pos.current.v)));
  }, []);

  // Drag anywhere on the stage (pointer) or use arrow keys; the divider eases toward the pointer
  const onPointerDown = (e: React.PointerEvent) => {
    const el = stage.current;
    if (!el) return;
    gsap.killTweensOf(pos.current);
    el.setPointerCapture(e.pointerId);
    el.dataset.dragging = 'true';
    const to = (clientX: number) => {
      const r = el.getBoundingClientRect();
      return gsap.utils.clamp(4, 96, ((clientX - r.left) / r.width) * 100);
    };
    gsap.to(pos.current, { v: to(e.clientX), duration: 0.35, ease: 'power3.out', onUpdate: apply });
    const move = (ev: PointerEvent) => gsap.to(pos.current, { v: to(ev.clientX), duration: 0.18, ease: 'power2.out', overwrite: true, onUpdate: apply });
    const up = () => {
      delete el.dataset.dragging;
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === 'ArrowLeft' ? -10 : e.key === 'ArrowRight' ? 10 : e.key === 'Home' ? -100 : e.key === 'End' ? 100 : 0;
    if (!step) return;
    e.preventDefault();
    gsap.to(pos.current, { v: gsap.utils.clamp(4, 96, pos.current.v + step), duration: 0.45, ease: 'power3.out', onUpdate: apply });
  };

  useGSAP(
    () => {
      apply();
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // A hint sweep shows the comparison is interactive
        ScrollTrigger.create({
          trigger: stage.current,
          start: 'top 65%',
          once: true,
          onEnter: () =>
            gsap
              .timeline({ onUpdate: apply })
              .to(pos.current, { v: 78, duration: 1.1, ease: 'power3.inOut' })
              .to(pos.current, { v: 26, duration: 1.3, ease: 'power3.inOut' })
              .to(pos.current, { v: 50, duration: 1, ease: 'power3.inOut' }),
        });
        gsap.from('[data-pillar]', { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '[data-pillars]', start: 'top 85%', once: true } });
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const to = Number(el.dataset.count);
          if (!to) return;
          const o = { v: 0 };
          gsap.to(o, { v: to, duration: 1.6, ease: 'expo.out', onUpdate: () => (el.textContent = String(Math.round(o.v))), scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="about" className="py-20 md:py-32">
      <div className="container-x">
        <SectionHeading
          align="split"
          eyebrow="Why Networked360"
          title={
            <>
              Less scrolling. <em className="text-gradient">More real people.</em>
            </>
          }
          lead="Born from years of sold-out speed-dating evenings in New Jersey and New York, now for every part of life — careers, capital, friendship, love and expert advice."
        />

        {/* Before / after comparison (tablet & desktop) */}
        <div
          ref={stage}
          role="slider"
          tabIndex={0}
          aria-label="Compare the old way with the Networked360 way"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          onPointerDown={onPointerDown}
          onKeyDown={onKey}
          className="group/cmp relative hidden h-[600px] cursor-ew-resize touch-pan-y overflow-hidden rounded-[40px] border border-line select-none md:block lg:h-[500px]"
          style={{ ['--split' as string]: '50%' }}
        >
          <Layer kind="old" />
          <div className="absolute inset-0" style={{ clipPath: 'inset(0 calc(100% - var(--split)) 0 0)' }}>
            <Layer kind="new" />
          </div>

          {/* handle */}
          <div className="pointer-events-none absolute inset-y-0 w-0" style={{ left: 'var(--split)' }}>
            <span className="absolute inset-y-0 -left-px w-[2px] bg-white shadow-[0_0_0_1px_rgb(0_159_216/0.15)]" />
            <span className="absolute top-1/2 left-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center">
              <span className="absolute h-[84px] w-[84px] rounded-full bg-white shadow-lift transition-transform duration-500 ease-[var(--ease-expo)] group-data-[dragging]/cmp:scale-110" />
              <LogoMark size={60} spin className="relative" />
              <span className="absolute -bottom-9 inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[0.75rem] font-semibold whitespace-nowrap text-white">
                <ChevronsLeftRight className="h-3.5 w-3.5" /> Drag
              </span>
            </span>
          </div>
        </div>

        {/* Phones: the two ways, stacked */}
        <div className="grid gap-4 md:hidden">
          <div className="rounded-[28px] bg-paper-2 p-6">
            <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink-4">
              <X className="h-3.5 w-3.5" /> The old way
            </span>
            <ul className="mt-4 grid gap-3">
              {OLD_WAY.map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-center gap-3 text-ink-3">
                  <Icon className="h-4 w-4 text-ink-4" /> <span className="line-through decoration-ink-4/60">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] bg-brand p-6 text-white">
            <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white/75">
              <Check className="h-3.5 w-3.5" /> The Networked360 way
            </span>
            <ul className="mt-4 grid gap-3">
              {NEW_WAY.map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-brand">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <b className="block font-semibold">{t}</b>
                    <span className="text-[0.85rem] text-white/80">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pillars — four cards, four different treatments */}
        <div data-pillars className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          {/* 1 — red, timer */}
          <div data-pillar className="relative flex min-h-[190px] flex-col justify-between gap-6 overflow-hidden rounded-[28px] bg-brand p-6 sm:min-h-[230px] text-white shadow-brand">
            <div className="flex items-start justify-between">
              <span className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white/75">Per conversation</span>
              <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden>
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgb(255 255 255 / 0.2)" strokeWidth="6" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.4" strokeDashoffset="46" />
              </svg>
            </div>
            <div>
              <p className="font-display font-extrabold text-[clamp(2.5rem,3.6vw,3.3rem)] leading-none tracking-[-0.04em]">
                5–<span data-count="7">7</span>
                <span className="ml-1 font-sans text-[0.32em] font-medium tracking-normal text-white/80">min</span>
              </p>
              <p className="mt-2 text-[0.92rem] text-white/80">Long enough to tell. Short enough to keep it light.</p>
            </div>
          </div>

          {/* 2 — white, faces */}
          <div data-pillar className="flex min-h-[190px] flex-col justify-between gap-6 rounded-[28px] border border-line bg-white p-6 sm:min-h-[230px] shadow-soft">
            <div className="flex -space-x-2.5">
              {FACES.map((p) => (
                <span key={p.name} className="relative h-10 w-10 overflow-hidden rounded-full border-[3px] border-white">
                  <Image src={p.img} alt="" fill sizes="40px" className="object-cover" />
                </span>
              ))}
              <span className="relative grid h-10 w-10 place-items-center rounded-full border-[3px] border-white bg-brand-50 text-[0.75rem] font-semibold text-brand">+5</span>
            </div>
            <div>
              <p className="font-display font-extrabold text-[clamp(2.5rem,3.6vw,3.3rem)] leading-none tracking-[-0.04em] text-ink">
                8–<span data-count="10">10</span>
              </p>
              <p className="mt-2 text-[0.92rem] text-ink-3">people met in one event</p>
            </div>
          </div>

          {/* 3 — dark, privacy */}
          <div data-pillar className="relative flex min-h-[190px] flex-col justify-between gap-6 overflow-hidden rounded-[28px] bg-ink p-6 sm:min-h-[230px] text-white">
            <div aria-hidden className="absolute -right-10 -bottom-12 h-44 w-44 rounded-full border-[18px] border-white/[0.04]" />
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-brand-300">
              <Lock className="h-5 w-5" />
            </span>
            <div className="relative">
              <p className="font-display font-extrabold text-[clamp(2.5rem,3.6vw,3.3rem)] leading-none tracking-[-0.04em]">0</p>
              <p className="mt-2 text-[0.92rem] text-white/70">details shared without a mutual yes</p>
            </div>
          </div>

          {/* 4 — tinted, formats */}
          <div data-pillar className="flex min-h-[190px] flex-col justify-between gap-6 rounded-[28px] border border-brand-100 bg-brand-50 p-6 sm:min-h-[230px]">
            <div className="inline-flex w-fit rounded-full border border-brand-100 bg-white p-1 text-[0.8rem] font-semibold shadow-soft">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-white">
                <MapPin className="h-3.5 w-3.5" /> In person
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-ink-2">
                <Video className="h-3.5 w-3.5 text-brand" /> Online
              </span>
            </div>
            <div>
              <p className="font-display font-extrabold text-[clamp(2.5rem,3.6vw,3.3rem)] leading-none tracking-[-0.04em] text-ink">
                <span data-count="2">2</span>
                <span className="ml-2 font-sans text-[0.32em] font-medium tracking-normal text-ink-3">formats</span>
              </p>
              <p className="mt-2 text-[0.92rem] text-ink-3">Same rules in a room or on live video.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
