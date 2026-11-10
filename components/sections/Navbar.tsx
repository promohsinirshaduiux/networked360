'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, LogIn } from 'lucide-react';
import { FullLogo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { NAV_LINKS, ROUTES } from '@/lib/content';
import { gsap, useGSAP } from '@/lib/gsap';
import { getLenis } from '@/lib/lenis';
import { cn } from '@/lib/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');
  const [hover, setHover] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // Glass background + hide-on-scroll-down. The active item is static: it only changes when a link is clicked.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      if (y > 640 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y < 640) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sliding pill follows the hovered link, otherwise rests on the active one
  const movePill = useCallback(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    const target = list.querySelector<HTMLElement>(`[data-id="${hover ?? active}"]`);
    if (!target) {
      pill.style.opacity = '0';
      return;
    }
    pill.style.opacity = '1';
    pill.style.width = `${target.offsetWidth}px`;
    pill.style.transform = `translateX(${target.offsetLeft}px)`;
  }, [hover, active]);
  useEffect(() => {
    movePill();
    window.addEventListener('resize', movePill);
    return () => window.removeEventListener('resize', movePill);
  }, [movePill]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from(headerRef.current, { y: -40, opacity: 0, duration: 1.2, delay: 0.1, ease: 'expo.out' });
  });

  useGSAP(
    () => {
      if (!open || !menuRef.current) return;
      gsap.from(menuRef.current.querySelectorAll('[data-menu-item]'), { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out', delay: 0.15 });
    },
    { dependencies: [open] },
  );

  return (
    <>
      <header ref={headerRef} className={cn('fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-expo)]', hidden && !open ? '-translate-y-[120%]' : 'translate-y-0')}>
        <div className="container-x pt-[max(0.75rem,env(safe-area-inset-top))] md:pt-4">
          <nav
            aria-label="Primary"
            className={cn(
              'grid h-[64px] grid-cols-[1fr_auto] items-center gap-4 rounded-full border pr-2 pl-2 transition-all duration-500 lg:grid-cols-[1fr_auto_1fr]',
              scrolled || open ? 'border-line bg-white/85 shadow-[0_12px_34px_-16px_rgb(23_20_26/0.22)] backdrop-blur-xl backdrop-saturate-150' : 'border-transparent',
            )}
          >
            <a href={ROUTES.home} aria-label="Networked360 home" onClick={() => setActive('top')} className="flex h-11 items-center justify-self-start rounded-full pl-3 sm:pl-4">
              <FullLogo height={30} priority className="max-sm:!w-[164px]" />
            </a>

            <ul ref={listRef} className="relative hidden items-center rounded-full border border-line bg-white/70 p-1 backdrop-blur lg:flex" onMouseLeave={() => setHover(null)}>
              <span ref={pillRef} aria-hidden className="absolute top-1 bottom-1 left-0 rounded-full bg-ink transition-[transform,width,opacity] duration-500 ease-[var(--ease-expo)]" />
              {NAV_LINKS.map((l) => {
                const lit = (hover ?? active) === l.id;
                return (
                  <li key={l.id}>
                    <a
                      data-id={l.id}
                      href={l.href}
                      onClick={() => setActive(l.id)}
                      onMouseEnter={() => setHover(l.id)}
                      onFocus={() => setHover(l.id)}
                      onBlur={() => setHover(null)}
                      aria-current={active === l.id ? 'true' : undefined}
                      className={cn('tap-44 relative z-10 inline-flex items-center rounded-full px-5 py-2 text-[0.93rem] font-medium transition-colors duration-300', lit ? 'text-white' : 'text-ink-2')}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1.5 justify-self-end">
              <a href={ROUTES.login} className="tap-44 hidden items-center gap-1.5 rounded-full px-4 py-2 text-[0.93rem] font-medium text-ink-2 transition-colors hover:text-brand md:inline-flex">
                <LogIn className="h-4 w-4" /> Login
              </a>
              <span className="hidden sm:inline-flex">
                <ButtonLink href={ROUTES.getStarted} size="sm" arrow>
                  Get Started
                </ButtonLink>
              </span>
              <button
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="grid h-11 w-11 place-items-center rounded-full border border-line-2 bg-white lg:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span className={cn('absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-500', open ? 'top-1.5 rotate-45' : 'top-0')} />
                  <span className={cn('absolute top-1.5 left-0 h-[1.5px] w-4 bg-ink transition-opacity', open && 'opacity-0')} />
                  <span className={cn('absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-500', open ? 'top-1.5 -rotate-45' : 'top-3')} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        data-lenis-prevent
        className={cn(
          'fixed inset-x-0 top-0 z-40 flex h-dvh flex-col justify-between gap-8 overflow-y-auto overscroll-contain bg-paper/96 px-[var(--gutter)] pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] backdrop-blur-2xl transition-[clip-path,visibility] duration-700 ease-[var(--ease-expo)] lg:hidden',
          open ? 'visible [clip-path:circle(150%_at_calc(100%-40px)_44px)]' : 'invisible [clip-path:circle(0%_at_calc(100%-40px)_44px)]',
        )}
      >
        <ul className="grid">
          {NAV_LINKS.map((l, i) => (
            <li key={l.id} className="overflow-hidden border-b border-line">
              <a
                data-menu-item
                href={l.href}
                onClick={() => {
                  setActive(l.id);
                  setOpen(false);
                }} className="flex items-center justify-between py-3 font-display text-[clamp(2.2rem,9vw,3rem)] leading-tight text-ink">
                {l.label}
                <span className="flex items-center gap-2 font-sans text-xs text-brand">
                  0{i + 1} <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="grid gap-3" data-menu-item>
          <ButtonLink href={ROUTES.getStarted} size="lg" arrow onClick={() => setOpen(false)}>
            Get Started
          </ButtonLink>
          <ButtonLink href={ROUTES.login} size="lg" variant="outline" onClick={() => setOpen(false)} icon={<LogIn className="h-4 w-4" />}>
            Login
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
