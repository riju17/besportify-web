import type { ReactNode } from 'react';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative min-h-screen">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white-100 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
        href="#content"
      >
        Skip to content
      </a>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-[18rem] h-[22rem] w-[22rem] rounded-full bg-violet-500/10 blur-3xl" />
      </div>
      <SiteHeader />
      <main id="content" tabIndex={-1} className="relative z-10">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
