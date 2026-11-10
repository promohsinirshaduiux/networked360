import Image from 'next/image';
import { cn } from '@/lib/cn';

/*
 * Brand assets built from the client's files (see brand-source/):
 *  - Icon: "Red Logo.svg", the round red mark, re-centred so the white mark sits exactly in the middle.
 *  - Full logo: "Red Logo Name.png" (mark + "Networked360"), recoloured to the brand blue #009fd8.
 */
const SIZES = [128, 256, 512, 1024] as const;
const pick = (px: number) => SIZES.find((s) => s >= px * 2) ?? 1024;

type MarkProps = {
  size?: number;
  /** Quick 360° turn, short pause, repeat. Off for reduced-motion users. */
  spin?: boolean;
  priority?: boolean;
  className?: string;
};

export function LogoMark({ size = 36, spin, priority, className }: MarkProps) {
  return (
    <Image
      src={`/brand/icon-${pick(size)}.webp`}
      alt="Networked360"
      width={size}
      height={size}
      unoptimized
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={false}
      className={cn('block max-w-none shrink-0 rounded-full select-none', spin && 'animate-logo-spin', className)}
      style={{ width: size, height: size }}
    />
  );
}

/** Trimmed full logo, width / height of the artwork. */
const FULL_RATIO = 6.8218;

/** The full logo (mark + name) in brand blue. Sized by height; width follows the artwork's ratio so it never crops. */
export function FullLogo({ height = 32, priority, className }: { height?: number; priority?: boolean; className?: string }) {
  const width = Math.round(height * FULL_RATIO);
  return (
    <Image
      src={width > 600 ? '/brand/logo-full.webp' : '/brand/logo-full-1200.webp'}
      alt="Networked360"
      width={width}
      height={height}
      unoptimized
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={false}
      className={cn('block h-auto max-w-full shrink-0 select-none', className)}
      style={{ width, aspectRatio: `${FULL_RATIO}` }}
    />
  );
}
