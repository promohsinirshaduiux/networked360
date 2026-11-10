import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export default function Eyebrow({ children, className, live }: { children: ReactNode; className?: string; live?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-brand', className)}>
      {live ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
        </span>
      ) : (
        <span className="h-px w-6 bg-current opacity-60" />
      )}
      {children}
    </span>
  );
}
