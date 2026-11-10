'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Briefcase, Check, Coffee, Rocket, TrendingUp } from 'lucide-react';
import { LogoMark } from '@/components/ui/Logo';
import { PEOPLE, type Person } from '@/lib/content';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/cn';

const SIDE_LEFT = [PEOPLE.helen, PEOPLE.arjun, PEOPLE.zoe];
const SIDE_RIGHT = [PEOPLE.elena, PEOPLE.richard, PEOPLE.lena];
const PAIRS: [Person, Person][] = [
  [PEOPLE.daniel, PEOPLE.priya],
  [PEOPLE.noah, PEOPLE.amara],
  [PEOPLE.marcus, PEOPLE.sofia],
];
const CHIPS = [
  { icon: Rocket, t: 'Founder · Fintech', cls: 'left-[2%] top-[14%]' },
  { icon: TrendingUp, t: 'Seed investor', cls: 'right-[3%] top-[8%]' },
  { icon: Briefcase, t: 'Hiring · Product', cls: 'left-[16%] top-[-4%]' },
  { icon: Coffee, t: 'New in NYC', cls: 'right-[17%] top-[-6%]' },
];
const R = 34;
const C = 2 * Math.PI * R;
const heights = ['h-[46%]', 'h-[62%]', 'h-[78%]'];

function Arch({ p, className }: { p: Person; className?: string }) {
  return (
    <div className={cn('group/arch relative overflow-hidden rounded-t-full rounded-b-[26px] bg-paper-3 shadow-soft', className)}>
      <Image src={p.img} alt="" fill sizes="(max-width: 1024px) 30vw, 180px" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover/arch:scale-105" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 pt-10 text-left text-white opacity-0 transition-opacity duration-500 group-hover/arch:opacity-100">
        <p className="text-[0.8rem] font-semibold leading-tight">{p.name}</p>
        <p className="text-[0.7rem] text-white/80">{p.role}</p>
      </div>
    </div>
  );
}

export default function MatchStage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(q('[data-arch]'), { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', delay: 0.6, stagger: { each: 0.08, from: 'center' } });
        gsap.from(q('[data-chip]'), { scale: 0.6, opacity: 0, duration: 0.9, ease: 'back.out(2)', delay: 1.4, stagger: 0.12 });
        gsap.to(q('[data-chip]'), { y: -10, duration: 2.8, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: { each: 0.5, from: 'random' } });
        gsap.to(q('[data-ring]'), { rotate: (i) => (i % 2 ? -360 : 360), duration: (i) => 60 + i * 20, ease: 'none', repeat: -1 });

        // Scroll: the crowd spreads apart and the rings open up
        const st = { trigger: root.current, start: 'top 75%', end: 'bottom top', scrub: true };
        gsap.to(q('[data-spread="l"]'), { xPercent: (i) => -30 - (2 - i) * 18, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-spread="r"]'), { xPercent: (i) => 30 + i * 18, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-rings]'), { scale: 1.25, opacity: 0.4, ease: 'none', scrollTrigger: st });

        // The match loop
        const timeText = q('[data-time]')[0];
        const ring = q('[data-timer]')[0];
        const lefts = q('[data-left] [data-face]');
        const rights = q('[data-right] [data-face]');
        let pair = 0;
        const clock = { s: 420 };
        gsap
          .timeline({ repeat: -1, delay: 1.8 })
          .set(clock, { s: 420 })
          .set(ring, { strokeDashoffset: 0 })
          .to(clock, {
            s: 0,
            duration: 3.2,
            ease: 'none',
            onUpdate: () => {
              const s = Math.round(clock.s);
              timeText.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
            },
          })
          .to(ring, { strokeDashoffset: C, duration: 3.2, ease: 'none' }, '<')
          .to(q('[data-clock]'), { scale: 0.6, opacity: 0, duration: 0.35, ease: 'power2.in' })
          .fromTo(q('[data-heart]'), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' })
          .fromTo(q('[data-yes]'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.12 }, '<')
          .fromTo(q('[data-line]'), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'expo.out' }, '<0.2')
          .fromTo(q('[data-pair]'), { boxShadow: '0 0 0 0px rgba(0,159,216,0)' }, { boxShadow: '0 0 0 5px rgba(0,159,216,0.9)', duration: 0.4 }, '<')
          .fromTo(q('[data-badge]'), { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.8)' }, '<0.1')
          .to({}, { duration: 1.6 })
          .to(q('[data-badge], [data-yes], [data-heart]'), { opacity: 0, y: 10, duration: 0.4, ease: 'power2.in' })
          .to(q('[data-line]'), { scaleX: 0, duration: 0.4 }, '<')
          .to(q('[data-pair]'), { boxShadow: '0 0 0 0px rgba(0,159,216,0)', duration: 0.4 }, '<')
          .add(() => {
            const prev = pair;
            pair = (pair + 1) % PAIRS.length;
            gsap.to([lefts[prev], rights[prev]], { opacity: 0, duration: 0.6 });
            gsap.to([lefts[pair], rights[pair]], { opacity: 1, duration: 0.6 });
          })
          .to(q('[data-clock]'), { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' }, '+=0.3');
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const centre = (side: 'left' | 'right') => (
    <div {...{ [`data-${side}`]: '' }} className="relative h-[94%] w-[clamp(124px,20vw,210px)]">
      <div data-pair className="relative h-full overflow-hidden rounded-t-full rounded-b-[30px] bg-paper-3 shadow-lift">
        {PAIRS.map((pr, k) => (
          <div key={k} data-face className="absolute inset-0" style={{ opacity: k === 0 ? 1 : 0 }}>
            <Image src={pr[side === 'left' ? 0 : 1].img} alt="" fill sizes="(max-width: 768px) 40vw, 210px" className="object-cover" loading={k === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <span data-yes className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-[0.78rem] font-semibold text-white opacity-0 shadow-brand">
        <Check className="h-3.5 w-3.5" /> Yes
      </span>
    </div>
  );

  return (
    <div ref={root} className="relative mx-auto mt-14 h-[clamp(300px,36vw,460px)] w-full max-w-[1280px] md:mt-20" aria-hidden>
      {/* 360° rings behind the meeting point */}
      <div data-rings className="pointer-events-none absolute bottom-[-30%] left-1/2 -z-10 aspect-square w-[min(92vw,880px)] -translate-x-1/2">
        <div data-ring className="absolute inset-0 rounded-full border border-dashed border-brand-200" />
        <div data-ring className="absolute inset-[12%] rounded-full border border-brand-100" />
        <div data-ring className="absolute inset-[24%] rounded-full border border-dashed border-brand-200" />
        <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle,#d9f1fa,transparent_70%)]" />
      </div>

      {CHIPS.map(({ icon: Icon, t, cls }) => (
        <span key={t} data-chip className={cn('absolute z-10 hidden items-center gap-2 rounded-full border border-line bg-white/90 py-1.5 pr-3.5 pl-1.5 text-[0.8rem] font-semibold text-ink shadow-float backdrop-blur lg:inline-flex', cls)}>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-50 text-brand">
            <Icon className="h-3.5 w-3.5" />
          </span>
          {t}
        </span>
      ))}

      <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center gap-[clamp(8px,1.4vw,18px)]">
        {SIDE_LEFT.map((p, k) => (
          <div key={p.name} data-arch data-spread="l" className={cn('hidden w-[clamp(84px,9vw,150px)] lg:block', heights[k])}>
            <Arch p={p} className="h-full w-full" />
          </div>
        ))}

        <div data-arch className="relative flex h-full items-end gap-[clamp(10px,1.6vw,22px)]">
          {centre('left')}
          <div className="relative mb-[22%] grid h-[96px] w-[96px] shrink-0 place-items-center md:h-[112px] md:w-[112px]">
            <span data-line className="absolute top-1/2 right-full h-[2px] w-[clamp(10px,1.6vw,22px)] origin-right bg-brand" style={{ transform: 'scaleX(0)' }} />
            <span data-line className="absolute top-1/2 left-full h-[2px] w-[clamp(10px,1.6vw,22px)] origin-left bg-brand" style={{ transform: 'scaleX(0)' }} />
            <div data-clock className="absolute inset-0 grid place-items-center rounded-full bg-white shadow-float">
              <svg viewBox="0 0 80 80" className="absolute inset-1 -rotate-90">
                <circle cx="40" cy="40" r={R} fill="none" stroke="#d9f1fa" strokeWidth="5" />
                <circle data-timer cx="40" cy="40" r={R} fill="none" stroke="#009fd8" strokeWidth="5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={0} />
              </svg>
              <span className="relative text-center leading-none">
                <span data-time className="block text-[1.05rem] font-semibold tabular-nums text-ink md:text-[1.15rem]">7:00</span>
                <span className="mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-ink-4">min left</span>
              </span>
            </div>
            <div data-heart className="absolute inset-1 grid place-items-center opacity-0">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-brand/30" />
              <LogoMark size={88} spin className="relative shadow-brand" />
            </div>
          </div>
          {centre('right')}

          <div data-badge className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-white py-2 pr-5 pl-2 text-[0.92rem] font-semibold text-ink shadow-float">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              It’s a match — details shared
            </span>
          </div>
        </div>

        {SIDE_RIGHT.map((p, k) => (
          <div key={p.name} data-arch data-spread="r" className={cn('hidden w-[clamp(84px,9vw,150px)] lg:block', heights[2 - k])}>
            <Arch p={p} className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
