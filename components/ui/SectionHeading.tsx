import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';
import { Reveal, SplitReveal } from './Motion';
import { cn } from '@/lib/cn';

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center' | 'split';
  className?: string;
  aside?: ReactNode;
};

/** Consistent section header: eyebrow, split-reveal display title and optional lead. */
export default function SectionHeading({ eyebrow, title, lead, align = 'left', className, aside }: Props) {
  const titleEl = (
    <SplitReveal className="font-display font-bold text-[clamp(2.1rem,4.6vw,4rem)] leading-[1.08] tracking-[-0.03em] text-ink">{title}</SplitReveal>
  );
  if (align === 'split') {
    return (
      <div className={cn('mb-12 grid grid-cols-1 items-end gap-8 md:mb-16 lg:grid-cols-[1.25fr_1fr] lg:gap-16', className)}>
        <div className="grid gap-5">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          {titleEl}
        </div>
        <Reveal delay={0.15} className="grid gap-6 lg:justify-self-end">
          {lead && <p className="max-w-[46ch] text-[1.08rem] leading-relaxed text-ink-3">{lead}</p>}
          {aside}
        </Reveal>
      </div>
    );
  }
  return (
    <div className={cn('mb-12 grid gap-5 md:mb-16', align === 'center' && 'justify-items-center text-center', className)}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      {titleEl}
      {lead && (
        <Reveal delay={0.15}>
          <p className={cn('max-w-[50ch] text-[1.08rem] leading-relaxed text-ink-3', align === 'center' && 'mx-auto')}>{lead}</p>
        </Reveal>
      )}
      {aside}
    </div>
  );
}
