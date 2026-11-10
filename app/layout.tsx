import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import SmoothScroll from '@/components/providers/SmoothScroll';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  axes: ['opsz'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Networked360 — Real connections, seven minutes at a time',
  description:
    'Networked360 is the speed-networking platform for careers, capital, friendship, dating and expert advice. Meet for 5–7 minutes, say yes privately, and connect when it’s mutual — online and in person.',
  openGraph: {
    title: 'Networked360 — Real connections, seven minutes at a time',
    description: 'Speed interviews, investor meetings, mentorship, friendship, dating and expert rooms. Online and in person.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // lets the page extend under notches; env(safe-area-inset-*) keeps content clear of them
  viewportFit: 'cover',
  themeColor: '#009fd8',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
