'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { AtSign, CalendarCheck, Check, Clock3, Heart, Lock, Mail, MapPin, Sparkles, Ticket } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { LogoMark } from '@/components/ui/Logo';
import { EXPLORE, PEOPLE } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/cn';

const you = PEOPLE.daniel;
const them = PEOPLE.elena;
const R = 30;
const C = 2 * Math.PI * R;

/* ---------- mini visuals, one per step ---------- */
function PickVisual() {
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        {EXPLORE.slice(0, 5).map((c, k) => {
          const Icon = c.icon;
          const on = k === 2;
          return (
            <span
              key={c.id}
              data-pick={on ? 'on' : 'off'}
              className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8rem] font-medium', on ? 'border-brand bg-brand text-white shadow-brand' : 'border-line bg-white text-ink-2')}
            >
              <Icon className="h-3.5 w-3.5" /> {c.name}
            </span>
          );
        })}
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-dashed border-brand-200 bg-brand-50 px-4 py-3 text-[0.84rem]">
        <span className="flex items-center gap-2 font-medium text-ink-2">
          <Ticket className="h-4 w-4 text-brand" /> Founders × Angels · Flatiron
        </span>
        <span data-booked className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[0.75rem] font-semibold text-brand shadow-soft">
          <Check className="h-3.5 w-3.5" strokeWidth={3} /> Seat reserved
        </span>
      </div>
    </div>
  );
}

function MeetVisual() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-paper-2 p-4">
      {[you, them].map((p, k) => (
        <div key={p.name} className={cn('flex items-center gap-3', k === 1 && 'order-3 flex-row-reverse text-right')}>
          <span className="relative h-14 w-14 overflow-hidden rounded-full border-[3px] border-white shadow-soft">
            <Image src={p.img} alt="" fill sizes="56px" className="object-cover" />
          </span>
          <span className="hidden text-[0.8rem] sm:block lg:hidden xl:block">
            <b className="block font-semibold text-ink">{p.name}</b>
            <span className="text-ink-3">{p.role}</span>
          </span>
        </div>
      ))}
      <div className="relative order-2 grid h-[76px] w-[76px] shrink-0 place-items-center">
        <svg viewBox="0 0 72 72" className="absolute inset-0 -rotate-90">
          <circle cx="36" cy="36" r={R} fill="none" stroke="#d9f1fa" strokeWidth="6" />
          <circle data-ring cx="36" cy="36" r={R} fill="none" stroke="#009fd8" strokeWidth="6" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={0} />
        </svg>
        <span data-clock className="relative text-[0.95rem] font-semibold tabular-nums text-ink">7:00</span>
      </div>
    </div>
  );
}

function DecideVisual() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        { p: you, label: 'Your choice' },
        { p: them, label: 'Their choice' },
      ].map(({ p, label }) => (
        <div key={p.name} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-soft">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={p.img} alt="" fill sizes="40px" className="object-cover" />
          </span>
          <span className="min-w-0 flex-1 text-[0.78rem] text-ink-3">{label}</span>
          <span className="relative h-8 w-[78px] [perspective:600px]">
            <span data-pending className="absolute inset-0 inline-flex items-center justify-center gap-1 rounded-full bg-paper-2 text-[0.75rem] font-medium text-ink-3">
              <Lock className="h-3 w-3" /> Private
            </span>
            <span data-yes className="absolute inset-0 inline-flex items-center justify-center gap-1 rounded-full bg-brand text-[0.78rem] font-semibold text-white opacity-0 shadow-brand">
              <Check className="h-3.5 w-3.5" strokeWidth={3} /> Yes
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function MatchVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand p-5 text-white">
      <div aria-hidden className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="relative flex items-center gap-4">
        <div className="flex -space-x-3">
          {[you, them].map((p) => (
            <span key={p.name} className="relative h-12 w-12 overflow-hidden rounded-full border-[3px] border-brand">
              <Image src={p.img} alt="" fill sizes="48px" className="object-cover" />
            </span>
          ))}
        </div>
        <div>
          <p className="font-display text-[1.6rem] leading-none italic">It’s a match.</p>
          <p className="mt-1 text-[0.82rem] text-white/80">Details shared by 10 AM tomorrow</p>
        </div>
      </div>
      <div className="relative mt-4 grid gap-2 sm:grid-cols-2">
        {[
          { i: Mail, t: 'elena@…capital.vc' },
          { i: AtSign, t: 'in/elena-v…' },
        ].map(({ i: I, t }) => (
          <span key={t} data-chip className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-[0.8rem] text-ink-2">
            <I className="h-4 w-4 text-brand" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  { icon: CalendarCheck, title: 'Pick your room', body: 'Choose a category and a city, or join online. Every room is balanced before the doors open.', meta: [MapPin, 'In person or online'] as const, Visual: PickVisual },
  { icon: Clock3, title: 'Meet for 5–7 minutes', body: 'One person at a time. When the timer ends, everyone rotates to the next seat.', meta: [Clock3, '8–10 conversations'] as const, Visual: MeetVisual },
  { icon: Lock, title: 'Say yes — privately', body: 'After each conversation, mark Yes if you’d like to connect. Nobody sees your choices.', meta: [Lock, 'Private by design'] as const, Visual: DecideVisual },
  { icon: Heart, title: 'Match when it’s mutual', body: 'Both said Yes? It’s a match, and you get each other’s details the next morning.', meta: [Sparkles, 'Mutual only'] as const, Visual: MatchVisual },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // The spine fills and the logo travels down it as you scroll
        gsap.fromTo('[data-fill]', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-steps]', start: 'top 60%', end: 'bottom 60%', scrub: true } });
        gsap.fromTo('[data-runner]', { top: '0%' }, { top: '100%', ease: 'none', scrollTrigger: { trigger: '[data-steps]', start: 'top 60%', end: 'bottom 60%', scrub: true } });

        q('[data-step]').forEach((step, k) => {
          const el = step as HTMLElement;
          const fromLeft = k % 2 === 0;
          gsap.set(el.querySelector('[data-card]'), { opacity: 0, x: fromLeft ? -60 : 60 });
          gsap.set(el.querySelector('[data-num]'), { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: el,
            start: 'top 72%',
            once: true,
            onEnter: () => {
              const tl = gsap.timeline();
              tl.to(el.querySelector('[data-card]'), { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out' })
                .to(el.querySelector('[data-num]'), { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, 0.1)
                .to(el.querySelector('[data-dot]'), { scale: 1, backgroundColor: '#009fd8', duration: 0.5, ease: 'back.out(2)' }, 0.1);
              // step-specific micro-animations
              if (k === 0) {
                tl.from(el.querySelectorAll('[data-pick]'), { y: 10, opacity: 0, stagger: 0.06, duration: 0.5 }, 0.3).from(el.querySelector('[data-booked]'), { scale: 0.5, opacity: 0, duration: 0.6, ease: 'back.out(2)' }, 0.8);
              }
              if (k === 1) {
                const clock = { s: 420 };
                const label = el.querySelector('[data-clock]')!;
                tl.to(el.querySelector('[data-ring]'), { strokeDashoffset: C, duration: 2.6, ease: 'none' }, 0.4).to(
                  clock,
                  { s: 0, duration: 2.6, ease: 'none', onUpdate: () => (label.textContent = `${Math.floor(clock.s / 60)}:${String(Math.round(clock.s) % 60).padStart(2, '0')}`) },
                  0.4,
                );
              }
              if (k === 2) {
                tl.to(el.querySelectorAll('[data-pending]'), { rotateX: 90, opacity: 0, duration: 0.45, stagger: 0.35 }, 0.7).fromTo(
                  el.querySelectorAll('[data-yes]'),
                  { rotateX: -90, opacity: 0 },
                  { rotateX: 0, opacity: 1, duration: 0.45, stagger: 0.35 },
                  0.95,
                );
              }
              if (k === 3) {
                tl.from(el.querySelectorAll('[data-chip]'), { y: 16, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'back.out(2)' }, 0.5);
              }
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="how" className="relative overflow-hidden bg-paper-2 py-20 md:py-32">
      <div aria-hidden className="absolute top-0 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#d9f1fa,transparent)] opacity-70" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="How it works"
          align="center"
          title={
            <>
              Five to seven minutes. <em className="text-gradient italic">Then you decide.</em>
            </>
          }
          lead="No swiping, no endless messaging. Real conversations on a timer, private choices, and connections that only happen when you both want them."
        />

        <ol data-steps className="relative mx-auto grid max-w-[1100px] gap-10 md:gap-14">
          {/* spine */}
          <div aria-hidden className="absolute top-2 bottom-2 left-[19px] w-[2px] bg-line-2 lg:left-1/2 lg:-translate-x-1/2">
            <div data-fill className="h-full w-full origin-top bg-brand" />
            <span data-runner className="absolute left-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 lg:block">
              <LogoMark size={40} spin className="shadow-brand ring-4 ring-paper-2" />
            </span>
          </div>

          {STEPS.map(({ icon: Icon, title, body, meta, Visual }, k) => {
            const right = k % 2 === 1;
            const MetaIcon = meta[0];
            return (
              <li key={title} data-step className="relative grid grid-cols-[40px_1fr] items-start gap-5 lg:grid-cols-[1fr_80px_1fr] lg:gap-0">
                {/* node */}
                <span data-dot aria-hidden className="relative z-10 mt-7 grid h-10 w-10 scale-75 place-items-center rounded-full bg-ink-4 text-white ring-8 ring-paper-2 lg:col-start-2 lg:row-start-1 lg:mx-auto">
                  <Icon className="h-[18px] w-[18px]" />
                </span>

                {/* card (auto height) */}
                <div data-card className={cn('min-w-0 lg:row-start-1', right ? 'lg:col-start-3 lg:pl-6' : 'lg:col-start-1 lg:pr-6')}>
                  <article
                    className={cn(
                      'w-full rounded-[26px] border border-line bg-white/90 p-6 shadow-soft backdrop-blur transition-shadow duration-500 hover:shadow-float sm:p-7 lg:max-w-[470px]',
                      right ? 'lg:mr-auto' : 'lg:ml-auto',
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[0.75rem] font-semibold text-brand-600">Step {k + 1}</span>
                      <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-ink-4">
                        <MetaIcon className="h-3.5 w-3.5" /> {meta[1]}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[clamp(1.6rem,2.2vw,2rem)] leading-[1.08] tracking-[-0.025em] text-ink">{title}</h3>
                    <p className="mt-2 max-w-[40ch] text-[0.98rem] leading-relaxed text-ink-3">{body}</p>
                    <div className="mt-5 border-t border-line pt-5">
                      <Visual />
                    </div>
                  </article>
                </div>

                {/* big outlined numeral on the opposite side (desktop) */}
                <div
                  data-num
                  aria-hidden
                  className={cn(
                    'hidden self-center font-display text-[clamp(7rem,12vw,11rem)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgb(0_159_216/0.35)] lg:row-start-1 lg:block',
                    right ? 'lg:col-start-1 lg:justify-self-end lg:pr-10' : 'lg:col-start-3 lg:pl-10',
                  )}
                >
                  0{k + 1}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
