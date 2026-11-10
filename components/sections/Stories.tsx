'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { MINI_QUOTES, STORIES } from '@/lib/content';
import { gsap, useGSAP } from '@/lib/gsap';

const AUTO = 7;

export default function Stories() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const prev = useRef(0);
  const s = STORIES[i];

  const go = (n: number, d: number) => {
    setDir(d);
    setI((n + STORIES.length) % STORIES.length);
  };

  // auto-advance
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => go(i + 1, 1), AUTO * 1000);
    return () => clearTimeout(t);
  }, [i]);

  useGSAP(
    () => {
      const from = prev.current;
      prev.current = i;
      const imgs = gsap.utils.toArray<HTMLElement>('[data-story-img]');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      imgs.forEach((im, k) => gsap.set(im, { zIndex: k === i ? 2 : k === from ? 1 : 0 }));
      if (reduced) {
        imgs.forEach((im, k) => gsap.set(im, { clipPath: k === i ? 'inset(0%)' : 'inset(0 0 0 100%)' }));
        return;
      }
      gsap.fromTo(
        imgs[i],
        { clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.inOut' },
      );
      gsap.fromTo(imgs[i].querySelector('img'), { scale: 1.2 }, { scale: 1, duration: 1.6, ease: 'expo.out' });
      gsap.fromTo('[data-quote] > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'expo.out', delay: 0.2 });
      gsap.fromTo('[data-bar]', { scaleX: 0 }, { scaleX: 1, duration: AUTO, ease: 'none' });
    },
    { dependencies: [i], scope: ref },
  );

  return (
    <section ref={ref} id="stories" className="overflow-hidden bg-paper-2 py-20 md:py-32">
      <div className="container-x">
        <SectionHeading
          align="split"
          eyebrow="Success stories"
          title={
            <>
              Met in <em className="text-gradient">seven minutes.</em>
            </>
          }
          lead="Hires, co-founders, best friends and second dates — all from one short conversation."
        />

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[36px] bg-paper-3 lg:aspect-auto lg:min-h-[560px]">
            {STORIES.map((st, k) => (
              <div key={st.tag} data-story-img className="absolute inset-0" style={{ clipPath: k === 0 ? 'inset(0%)' : 'inset(0 0 0 100%)' }}>
                <Image src={st.img} alt={`${st.tag} success story`} fill sizes="(max-width: 1024px) 100vw, 660px" className="object-cover" />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 z-[4] flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3.5 py-1.5 text-[0.8rem] font-semibold text-ink shadow-float">{s.tag}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-[0.8rem] font-semibold text-white">
                <Sparkles className="h-3.5 w-3.5" /> {s.result}
              </span>
            </div>
          </div>

          {/* quote */}
          <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[36px] border border-line bg-white p-7 shadow-soft sm:p-10">
            <span aria-hidden className="pointer-events-none absolute -top-6 right-6 font-display font-extrabold text-[11rem] leading-none text-brand-100 select-none">”</span>
            <div data-quote className="relative grid gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[0.76rem] font-semibold text-brand-600">
                <Quote className="h-3.5 w-3.5 fill-current" /> {s.tag} story
              </span>
              <blockquote className="font-display font-semibold text-[clamp(1.35rem,2.1vw,1.85rem)] leading-[1.32] tracking-[-0.02em] text-ink">“{s.quote}”</blockquote>
              <div className="flex items-center gap-4">
                <span className="relative h-14 w-14 overflow-hidden rounded-full ring-4 ring-brand-50">
                  <Image src={s.person.img} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="min-w-0">
                  <b className="flex items-center gap-1.5 font-semibold text-ink">
                    {s.person.name} <BadgeCheck className="h-4 w-4 text-brand" aria-label="Verified member" />
                  </b>
                  <span className="text-[0.9rem] text-ink-3">{s.person.role}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-line pt-6">
              <div className="flex items-center gap-3">
                <span className="font-display font-bold text-[1.4rem] tabular-nums text-ink">0{i + 1}</span>
                <span className="relative h-[2px] w-24 overflow-hidden rounded-full bg-paper-3">
                  <span data-bar className="absolute inset-0 origin-left bg-brand" />
                </span>
                <span className="text-[0.9rem] tabular-nums text-ink-4">0{STORIES.length}</span>
              </div>
              <div className="flex gap-2">
                <button aria-label="Previous story" onClick={() => go(i - 1, -1)} className="grid h-12 w-12 place-items-center rounded-full border border-line-2 bg-white text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button aria-label="Next story" onClick={() => go(i + 1, 1)} className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white transition-colors duration-300 hover:bg-brand">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Short quotes strip */}
      <div className="mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] md:mt-16">
        <div className="flex w-max gap-4 hover:[animation-play-state:paused] motion-safe:animate-marquee">
          {[...MINI_QUOTES, ...MINI_QUOTES].map((q, k) => (
            <figure
              key={k}
              aria-hidden={k >= MINI_QUOTES.length}
              className="grid w-[300px] shrink-0 gap-3 rounded-[22px] border border-line bg-white p-4 shadow-soft transition-colors duration-300 hover:border-ink/20"
            >
              <blockquote className="text-[0.95rem] leading-snug text-ink-2">“{q.text}”</blockquote>
              <figcaption className="flex items-center gap-2.5">
                <span className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image src={q.person.img} alt="" fill sizes="32px" className="object-cover" />
                </span>
                <span className="text-[0.8rem] leading-tight">
                  <b className="block font-semibold text-ink">{q.person.name}</b>
                  <span className="text-ink-4">{q.person.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
