'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Code2, Crown, Megaphone, Palette, Rocket, UserSearch } from 'lucide-react';
import Eyebrow from '@/components/ui/Eyebrow';
import { LogoMark } from '@/components/ui/Logo';
import { Reveal, SplitReveal } from '@/components/ui/Motion';
import { COMPANIES, PEOPLE } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

const ROLES = [
  { icon: Code2, t: 'Engineers' },
  { icon: Rocket, t: 'Founders' },
  { icon: Palette, t: 'Designers' },
  { icon: UserSearch, t: 'Recruiters' },
  { icon: Megaphone, t: 'Marketers' },
  { icon: Crown, t: 'Executives' },
];
const FACES = [PEOPLE.amara, PEOPLE.kenji, PEOPLE.zoe, PEOPLE.arjun, PEOPLE.sofia];

const INNER = COMPANIES.slice(0, 5);
const OUTER = COMPANIES.slice(5);

function Bubble({ c }: { c: (typeof COMPANIES)[number] }) {
  return (
    <span className="grid h-[60px] w-[118px] place-items-center rounded-full border border-line bg-white shadow-float transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-expo)] hover:scale-[1.1] hover:border-ink/15 hover:shadow-lift sm:h-[64px] sm:w-[128px]">
      <Image src={c.logo} alt={c.name} width={120} height={c.h} unoptimized className="w-auto max-w-[88px] object-contain sm:max-w-[96px]" style={{ height: c.h * 0.78 }} />
    </span>
  );
}

export default function Companies() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        // Each ring rotates; each bubble counter-rotates so logos stay upright
        const rings = gsap.utils.toArray<HTMLElement>('[data-orbit]');
        const spins = rings.map((ring, k) => {
          const dir = k === 0 ? 1 : -1;
          const dur = k === 0 ? 50 : 80;
          return [
            gsap.to(ring, { rotate: 360 * dir, duration: dur, ease: 'none', repeat: -1 }),
            gsap.to(ring.querySelectorAll('[data-upright]'), { rotate: -360 * dir, duration: dur, ease: 'none', repeat: -1 }),
          ];
        });
        const stage = ref.current?.querySelector('[data-stage]');
        const slow = () => spins.flat().forEach((t) => gsap.to(t, { timeScale: 0.15, duration: 0.6 }));
        const fast = () => spins.flat().forEach((t) => gsap.to(t, { timeScale: 1, duration: 0.6 }));
        stage?.addEventListener('mouseenter', slow);
        stage?.addEventListener('mouseleave', fast);

        gsap.set('[data-bubble]', { scale: 0, opacity: 0 });
        ScrollTrigger.create({
          trigger: stage as Element,
          start: 'top 75%',
          once: true,
          onEnter: () => gsap.to('[data-bubble]', { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.8)', stagger: { each: 0.06, from: 'random' } }),
        });
        return () => {
          stage?.removeEventListener('mouseenter', slow);
          stage?.removeEventListener('mouseleave', fast);
        };
      });
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set('[data-tile]', { y: 24, opacity: 0 });
        ScrollTrigger.batch('[data-tile]', { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'expo.out' }) });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const place = (i: number, n: number, r: number, offset: number) => {
    const a = (i / n) * Math.PI * 2 + offset;
    return { left: `${(50 + Math.cos(a) * r).toFixed(3)}%`, top: `${(50 + Math.sin(a) * r).toFixed(3)}%` };
  };

  return (
    <section ref={ref} id="companies" className="relative overflow-hidden py-20 md:py-32">
      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <div className="grid gap-6">
          <Reveal>
            <Eyebrow>Who you’ll meet</Eyebrow>
          </Reveal>
          <SplitReveal className="font-display font-bold text-[clamp(2.1rem,4.4vw,3.9rem)] leading-[1.08] tracking-[-0.03em] text-ink">
            People from the world’s <em className="text-gradient">leading companies.</em>
          </SplitReveal>
          <Reveal delay={0.1}>
            <p className="max-w-[44ch] text-[1.08rem] leading-relaxed text-ink-3">
              Every room brings together professionals from global tech, media and consumer brands — alongside founders, investors and
              local leaders.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex max-w-[520px] flex-wrap gap-2">
            {ROLES.map(({ icon: Icon, t }) => (
              <span key={t} className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-100 bg-brand-50/70 py-1.5 pr-4 pl-1.5 text-[0.9rem] font-medium text-ink-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-brand shadow-soft">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {t}
              </span>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {FACES.map((p) => (
                <span key={p.name} className="relative h-11 w-11 overflow-hidden rounded-full border-[3px] border-paper transition-transform duration-500 ease-[var(--ease-expo)] hover:z-10 hover:scale-[1.18]">
                  <Image src={p.img} alt="" fill sizes="44px" className="object-cover" />
                </span>
              ))}
            </div>
            <p className="text-[0.92rem] text-ink-3">
              <b className="font-semibold text-ink">Verified</b> professionals in every room
            </p>
          </Reveal>
        </div>

        {/* Desktop orbit */}
        <div data-stage className="relative mx-auto hidden aspect-square w-full max-w-[660px] lg:block">
          <div className="absolute inset-[6%] rounded-full border border-dashed border-brand-200" />
          <div className="absolute inset-[24%] rounded-full border border-line-2" />
          <div className="absolute inset-[36%] rounded-full bg-[radial-gradient(circle,#d9f1fa,transparent_70%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-brand/20" />
            <LogoMark size={128} spin className="relative shadow-brand" />
          </div>

          <div data-orbit className="absolute inset-0">
            {INNER.map((c, i) => (
              <div key={c.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={place(i, INNER.length, 23, -Math.PI / 2)}>
                <div data-upright>
                  <div data-bubble>
                    <Bubble c={c} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div data-orbit className="absolute inset-0">
            {OUTER.map((c, i) => (
              <div key={c.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={place(i, OUTER.length, 46, -Math.PI / 2 + 0.4)}>
                <div data-upright>
                  <div data-bubble>
                    <Bubble c={c} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & tablet grid — one logo per tile */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
          {COMPANIES.map((c) => (
            <div key={c.name} data-tile className="group grid h-24 place-items-center overflow-hidden rounded-[22px] border border-line bg-white shadow-soft">
              <Image src={c.logo} alt={c.name} width={120} height={c.h} unoptimized className="w-auto max-w-[110px] object-contain transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-[1.1]" style={{ height: c.h * 0.85 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
