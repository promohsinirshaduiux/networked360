'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { BadgeCheck, Check, Clock3, EyeOff } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/Logo';
import { PEOPLE, ROUTES, type Person } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/* Faces placed on the rings around the logo (angle in degrees, ring radius in %) */
const ORBITERS: { p: Person; a: number; r: number; s: number }[] = [
  // outer ring — six faces, evenly spaced
  { p: PEOPLE.amara, a: 0, r: 46, s: 58 },
  { p: PEOPLE.kenji, a: 60, r: 46, s: 54 },
  { p: PEOPLE.priya, a: 120, r: 46, s: 58 },
  { p: PEOPLE.richard, a: 180, r: 46, s: 54 },
  { p: PEOPLE.sofia, a: 240, r: 46, s: 58 },
  { p: PEOPLE.daniel, a: 300, r: 46, s: 54 },
  // inner ring — three faces, offset between them
  { p: PEOPLE.zoe, a: 90, r: 30, s: 46 },
  { p: PEOPLE.noah, a: 210, r: 30, s: 46 },
  { p: PEOPLE.maya, a: 330, r: 30, s: 46 },
];

const PERKS = [
  { icon: Clock3, t: '5–7 minute conversations' },
  { icon: EyeOff, t: 'Private until mutual' },
  { icon: BadgeCheck, t: 'Verified members' },
];

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // panel opens up as it scrolls in
        gsap.fromTo('[data-panel]', { clipPath: 'inset(8% 6% 8% 6% round 56px)' }, { clipPath: 'inset(0% 0% 0% 0% round 40px)', ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top 25%', scrub: true } });
        // giant outlined words drift in opposite directions
        gsap.to('[data-drift="1"]', { xPercent: -25, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.to('[data-drift="-1"]', { xPercent: 20, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        // rings breathe outwards like a pulse
        gsap.utils.toArray<HTMLElement>('[data-pulse]').forEach((r, k) => {
          gsap.fromTo(r, { scale: 0.55, opacity: 0.7 }, { scale: 1.25, opacity: 0, duration: 4, ease: 'sine.out', repeat: -1, delay: k * 1.33 });
        });
        // orbiting faces
        gsap.to('[data-orbiters]', { rotate: 360, duration: 90, ease: 'none', repeat: -1 });
        gsap.to('[data-face]', { rotate: -360, duration: 90, ease: 'none', repeat: -1 });
        // headline words pop in
        gsap.set('[data-word]', { yPercent: 110 });
        ScrollTrigger.create({
          trigger: '[data-headline]',
          start: 'top 80%',
          once: true,
          onEnter: () => gsap.to('[data-word]', { yPercent: 0, duration: 1.2, stagger: 0.07, ease: 'expo.out' }),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const words = ['Your', 'next', 'yes', 'is', 'seven', 'minutes', 'away.'];

  return (
    <section ref={ref} id="join" className="px-2 py-6 sm:px-3 md:py-10">
      <div data-panel className="relative isolate overflow-hidden rounded-[40px] bg-brand text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_15%_0%,#33b6e3_0%,transparent_60%),radial-gradient(60%_70%_at_90%_100%,#00668a_0%,transparent_60%)]" />

        {/* giant drifting outline type */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex flex-col justify-between overflow-hidden py-6 select-none">
          <p data-drift="1" className="font-display font-extrabold text-[clamp(4rem,12vw,11.5rem)] leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.18)]">
            Meet · Talk · Say yes · Meet · Talk · Say yes
          </p>
          <p data-drift="-1" className="-ml-[40%] font-display font-extrabold text-[clamp(4rem,12vw,11.5rem)] leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.18)]">
            It’s a match · It’s a match · It’s a match
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-16">
          <div className="grid gap-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" /> Free to join
            </span>
            <h2 data-headline className="font-display font-extrabold text-[clamp(2.3rem,5.2vw,4.9rem)] leading-[1.05] tracking-[-0.04em]">
              {words.map((w, k) => (
                <span key={k} className="inline-block overflow-hidden pr-[0.22em] pb-[0.06em] align-top">
                  <span data-word className={k === 4 || k === 5 ? 'inline-block' : 'inline-block'}>
                    {w}
                  </span>
                </span>
              ))}
            </h2>
            <p className="max-w-[46ch] text-[1.1rem] leading-relaxed text-white/85">
              Create your free profile, get verified and grab a seat at your first room, online or in person.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={ROUTES.getStarted} variant="white" size="lg" arrow>
                Get Started
              </ButtonLink>
              <ButtonLink href={ROUTES.upcoming} variant="outline-light" size="lg">
                Explore Events
              </ButtonLink>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] text-white/85">
              {PERKS.map(({ icon: Icon, t }) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* ring stage */}
          <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[460px]">
            {[0, 1, 2].map((k) => (
              <span key={k} data-pulse className="absolute inset-[18%] rounded-full border-2 border-white/50" />
            ))}
            <span className="absolute inset-0 rounded-full border border-dashed border-white/30" />
            <span className="absolute inset-[16%] rounded-full border border-white/20" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="relative grid place-items-center rounded-full bg-white p-2.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.45)]">
                <LogoMark size={108} spin />
              </span>
            </div>
            <div data-orbiters className="absolute inset-0">
              {ORBITERS.map(({ p, a, r, s }) => {
                const rad = (a * Math.PI) / 180;
                return (
                  <span key={p.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(50 + Math.cos(rad) * r).toFixed(3)}%`, top: `${(50 + Math.sin(rad) * r).toFixed(3)}%` }}>
                    <span data-face className="relative block overflow-hidden rounded-full border-[3px] border-white shadow-float" style={{ width: s, height: s }}>
                      <Image src={p.img} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                  </span>
                );
              })}
            </div>
            <span className="absolute bottom-[1%] left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-[0.82rem] font-semibold text-ink shadow-float">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              It’s a match
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
