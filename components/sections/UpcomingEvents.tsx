'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Clock3, MapPin, Timer, Users, Video } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { ROUTES, UPCOMING, type EventItem } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/cn';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const parse = (s: string) => new Date(`${s}T12:00:00`);
const startsIn = (s: string) => {
  const days = Math.max(0, Math.round((parse(s).getTime() - new Date().setHours(12, 0, 0, 0)) / 864e5));
  return days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`;
};

function Poster({ e }: { e: EventItem }) {
  const d = parse(e.date);
  const booked = e.capacity - e.seatsLeft;
  const low = e.seatsLeft <= 9;
  return (
    <article data-poster className="group relative isolate flex aspect-[4/5.4] flex-col justify-between overflow-hidden rounded-[32px] bg-ink p-4 text-white shadow-soft sm:p-5">
      <div data-poster-img className="absolute inset-0 -z-10 scale-110">
        <Image src={e.img} alt="" fill sizes="(max-width: 768px) 92vw, (max-width: 1280px) 33vw, 420px" className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/5 to-black/70" />

      {/* top: date + format */}
      <div className="flex items-start justify-between">
        <div className="w-[70px] overflow-hidden rounded-[18px] border border-white/60 bg-white/85 text-center text-ink shadow-float backdrop-blur-xl">
          <span className="block bg-brand py-1 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white">{MONTHS[d.getMonth()]}</span>
          <span className="block pt-2 font-display font-extrabold text-[1.9rem] leading-none tabular-nums">{d.getDate()}</span>
          <span className="block pt-1 pb-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-4">{DAYS[d.getDay()]}</span>
        </div>
        <div className="grid justify-items-end gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[0.76rem] font-semibold backdrop-blur-md">
            {e.format === 'Online' ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />} {e.format}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-[0.76rem] font-semibold shadow-brand">
            <Timer className="h-3.5 w-3.5" /> <span suppressHydrationWarning>{startsIn(e.date)}</span>
          </span>
        </div>
      </div>

      {/* bottom: glass panel */}
      <div className="rounded-[24px] bg-white p-5 text-ink shadow-float ring-1 ring-black/[0.03]">
        <span className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em]" style={{ color: e.color }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: e.color }} /> {e.category}
        </span>
        <h3 className="mt-2 font-display font-bold text-[1.4rem] leading-[1.15] tracking-[-0.02em]">{e.title}</h3>
        <p className="mt-1.5 text-[0.9rem] leading-snug text-ink-3">{e.blurb}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-ink-4" /> {e.place}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-ink-4" /> {e.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-ink-4" /> {e.rounds} × {e.mins} min
          </span>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-[0.75rem]">
            <span className="text-ink-4">{booked} booked</span>
            <span className={cn('font-semibold', low ? 'text-brand' : 'text-ink-3')}>{low ? `Only ${e.seatsLeft} seats left` : `${e.seatsLeft} seats left`}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
            <div data-seat className="h-full origin-left rounded-full bg-brand" style={{ width: `${(booked / e.capacity) * 100}%` }} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-ink/[0.07] pt-4">
          <span className="text-[1.15rem] font-semibold">{e.price}</span>
          <a href={ROUTES.getStarted} className="group/r inline-flex items-center gap-2 rounded-full bg-ink py-2 pr-2 pl-4 text-[0.86rem] font-semibold text-white transition-colors duration-300 hover:bg-brand">
            Reserve seat
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover/r:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function UpcomingEvents() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const posters = gsap.utils.toArray<HTMLElement>('[data-poster]');
        gsap.set(posters, { clipPath: 'inset(100% 0% 0% 0% round 32px)' });
        gsap.set('[data-seat]', { scaleX: 0 });
        ScrollTrigger.create({
          trigger: '[data-posters]',
          start: 'top 78%',
          once: true,
          onEnter: () => {
            gsap.to(posters, { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.4, stagger: 0.15, ease: 'expo.inOut' });
            gsap.to('[data-seat]', { scaleX: 1, duration: 1.6, stagger: 0.15, ease: 'expo.out', delay: 0.9 });
          },
        });
        // parallax inside each poster
        posters.forEach((p) => {
          gsap.fromTo(p.querySelector('[data-poster-img]'), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="upcoming" className="py-20 md:py-32">
      <div className="container-x">
        <SectionHeading
          align="split"
          eyebrow="Upcoming events"
          title={
            <>
              Rooms opening <em className="text-ink">near you.</em>
            </>
          }
          lead="A few featured rooms this month. New events open every week across New York, New Jersey and online."
          aside={
            <ButtonLink href={ROUTES.events} variant="dark" arrow className="justify-self-start lg:justify-self-end">
              View all events
            </ButtonLink>
          }
        />
        <div data-posters className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {UPCOMING.map((e) => (
            <Poster key={e.id} e={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
