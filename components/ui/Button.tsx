import { ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'brand' | 'dark' | 'outline' | 'outline-light' | 'white' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap transition-[transform,box-shadow,background-color,color,border-color] duration-500 ease-[var(--ease-expo)] disabled:pointer-events-none disabled:opacity-40';

// Each filled variant has a sweep layer that slides up on hover.
const sweep = 'after:absolute after:inset-0 after:-z-10 after:translate-y-full after:rounded-full after:transition-transform after:duration-500 after:ease-[var(--ease-expo)] hover:after:translate-y-0';

const variants: Record<Variant, string> = {
  brand: cn('bg-brand text-white shadow-brand after:bg-brand-700 hover:shadow-[0_18px_40px_-12px_rgb(0_159_216/0.7)]', sweep),
  dark: cn('bg-ink text-white shadow-[0_10px_30px_-12px_rgb(23_20_26/0.55)] after:bg-brand', sweep),
  outline: 'border border-line-2 bg-white/70 text-ink backdrop-blur hover:border-brand hover:text-brand',
  'outline-light': cn('border border-white/45 text-white after:bg-white hover:text-brand', sweep),
  white: cn('bg-white text-ink shadow-soft after:bg-ink hover:text-white', sweep),
  ghost: 'text-ink-2 hover:bg-ink/5 hover:text-ink',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.88rem] pointer-coarse:h-11',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
};

type Common = { variant?: Variant; size?: Size; arrow?: boolean; icon?: ReactNode; className?: string; children: ReactNode };

function Inner({ arrow, icon, children }: Pick<Common, 'arrow' | 'icon' | 'children'>) {
  return (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <span className="relative -mr-1 inline-flex h-4 w-4 overflow-hidden" aria-hidden>
          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover/btn:translate-x-5" />
          <ArrowRight className="absolute h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[var(--ease-expo)] group-hover/btn:translate-x-0" />
        </span>
      )}
    </>
  );
}

/** Anchor styled as a button (in-page anchors, mailto, external). */
export function ButtonLink({ variant = 'brand', size = 'md', arrow, icon, className, children, ...rest }: Common & Omit<ComponentProps<'a'>, 'className' | 'children'>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner arrow={arrow} icon={icon}>{children}</Inner>
    </a>
  );
}

export function Button({ variant = 'brand', size = 'md', arrow, icon, className, children, type = 'button', ...rest }: Common & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner arrow={arrow} icon={icon}>{children}</Inner>
    </button>
  );
}
