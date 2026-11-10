'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { BadgeCheck, CalendarDays, EyeOff, MapPin } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { PEOPLE, ROUTES, UPCOMING } from '@/lib/content';
import { gsap, useGSAP } from '@/lib/gsap';
import MatchStage from './MatchStage';

const TRUST = [
  { icon: BadgeCheck, t: 'Verified members' },
  { icon: EyeOff, t: 'Private until mutual' },
  { icon: MapPin, t: 'NYC, NJ & online' },
];

/** Live countdown to the next featured room. */
function NextRoom() {
  const target = new Date(`${UPCOMING[0].date}T18:30:00`).getTime();
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [target]);
  const d = left === null ? '--' : String(Math.floor(left / 864e5));
  const h = left === null ? '--' : String(Math.floor((left / 36e5) % 24)).padStart(2, '0');
  const m = left === null ? '--' : String(Math.floor((left / 6e4) % 60)).padStart(2, '0');
  const s = left === null ? '--' : String(Math.floor((left / 1e3) % 60)).padStart(2, '0');
  return (
    <a
      href={ROUTES.upcoming}
      className="group inline-flex min-h-11 items-center gap-2.5 whitespace-nowrap rounded-full sm:gap-3 border border-white/30 bg-white/12 py-1.5 pr-4 pl-1.5 text-[0.84rem] text-white/90 backdrop-blur-md transition-colors hover:border-white/60 hover:bg-white/20"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00739d] px-2.5 py-1 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-white">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" /> Live
      </span>
      <span className="hidden sm:inline">Next room starts in</span>
      <span className="font-semibold tabular-nums text-white">
        {d}d {h}h {m}m <span className="text-brand-300">{s}s</span>
      </span>
      <CalendarDays className="h-4 w-4 text-white/70 transition-colors group-hover:text-white" />
    </a>
  );
}

const STACK = [PEOPLE.amara, PEOPLE.kenji, PEOPLE.priya];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'expo.out' } });
        tl.from('[data-hero-pill]', { y: 20, opacity: 0, duration: 1 })
          .from('[data-line] > span', { yPercent: 115, rotate: 2, duration: 1.3, stagger: 0.1 }, 0.1)
          .from('[data-stack] > span', { scale: 0, duration: 0.8, stagger: 0.08, ease: 'back.out(2)' }, 0.6)
          .fromTo('[data-underline]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 0.9)
          .from('[data-hero-fade]', { y: 22, opacity: 0, duration: 1, stagger: 0.08 }, 0.55);

        // As you scroll away, the copy lifts and softens
        gsap.to('[data-hero-copy]', {
          yPercent: -18,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    // 24px margin on every side; the top starts 24px below the floating navbar (16px offset + 64px bar + 24px)
    <section ref={ref} id="top" aria-label="Introduction" className="px-6 pt-[104px] pb-6">
      <div className="relative isolate overflow-hidden rounded-[30px] bg-[#06222f] pt-12 pb-16 md:pt-16 md:pb-20">
        {/* background photo, then a navy overlay that keeps white text above AA contrast (about 5.7:1 even over the brightest pixels) */}
        <Image src="/images/scenes/cta-toast.jpg" alt="" fill priority sizes="(max-width: 1400px) 100vw, 1400px" className="-z-20 object-cover object-[62%_30%]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#04202d]/80 via-[#06222f]/70 to-[#06222f]/85" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.14] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_10%,transparent_80%)]" />

      <div data-hero-copy className="container-x flex flex-col items-center text-center">
        <div data-hero-pill>
          <NextRoom />
        </div>

        <h1 className="mt-8 font-display font-extrabold text-[clamp(2.4rem,6.2vw,5.6rem)] leading-[1.04] tracking-[-0.04em] text-white">
          <span data-line className="block overflow-hidden pb-[0.06em]">
            <span className="block">Real connections,</span>
          </span>
          <span data-line className="block overflow-hidden pb-[0.12em]">
            <span className="inline-flex items-center gap-[0.18em]">
              <span data-stack aria-hidden className="hidden -space-x-[0.18em] sm:inline-flex">
                {STACK.map((p) => (
                  <span key={p.name} className="relative inline-block h-[0.78em] w-[0.78em] overflow-hidden rounded-full border-[0.05em] border-white shadow-soft">
                    <Image src={p.img} alt="" fill sizes="96px" className="object-cover" loading="eager" />
                  </span>
                ))}
              </span>
              <span className="relative">
                <em className="text-gradient-light">seven minutes</em>
                <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.06em] left-0 h-[0.18em] w-full overflow-visible">
                  <path data-underline pathLength={1} d="M3 14 C 60 4, 140 4, 200 10 S 280 16, 297 6" fill="none" stroke="#7fd3f3" strokeWidth="5" strokeLinecap="round" strokeDasharray="1" />
                </svg>
              </span>
            </span>
          </span>
          <span data-line className="block overflow-hidden pb-[0.06em]">
            <span className="block">at a time.</span>
          </span>
        </h1>

        <p data-hero-fade className="mt-7 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.22rem)] leading-relaxed text-white/90">
          Meet founders, hiring managers, investors, mentors, new friends — or someone special. Talk face to face for 5–7 minutes, say yes
          privately, and connect only when it’s mutual.
        </p>

        <div data-hero-fade className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={ROUTES.getStarted} size="lg" variant="white" arrow>
            Get Started
          </ButtonLink>
          <ButtonLink href={ROUTES.events} size="lg" variant="outline-light">
            Explore Events
          </ButtonLink>
        </div>

        <div data-hero-fade className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.88rem] text-white/90">
          {TRUST.map(({ icon: Icon, t }) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-brand-300" /> {t}
            </span>
          ))}
        </div>
      </div>

      <MatchStage />
      </div>
    </section>
  );
}
