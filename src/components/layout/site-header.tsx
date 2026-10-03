'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BeSportifyLogo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Container } from './container';
import { cx } from '@/lib/utils';
import { primaryNavItems } from '@/lib/routes';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    if (menuOpen) {
      window.addEventListener('keydown', onKeyDown);
      requestAnimationFrame(() => firstLinkRef.current?.focus());
    }

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header
      onBlur={(event) => {
        if (menuOpen && !event.currentTarget.contains(event.relatedTarget))
          setMenuOpen(false);
      }}
      className="sticky top-0 z-40 border-b border-white-100/10 bg-ink-950/80 backdrop-blur-2xl transition-colors duration-300"
    >
      <Container className="flex items-center justify-between gap-3 py-3 sm:gap-6 sm:py-4 lg:gap-8">
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <ThemeToggle />
          <Link
            className="group flex min-w-0 shrink-0 items-center gap-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
            href="/"
          >
            <BeSportifyLogo />
          </Link>
        </div>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 items-center gap-2 overflow-x-auto rounded-full border border-slate-700/60 bg-slate-800/45 px-4 py-2 backdrop-blur-md lg:flex"
        >
          {primaryNavItems.map((item) => (
            <Link
              className="shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-grey-300 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-slate-700/50 hover:text-white-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          <Button href="/products/statstrike" variant="secondary">
            Explore StatStrike
          </Button>
          <Button href="/contact">Request a Demo</Button>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[0.75rem] border border-slate-700 bg-slate-800/70 text-white-100 transition hover:border-blue-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          ref={menuButtonRef}
          type="button"
        >
          <span className="sr-only">
            {menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          </span>
          <span aria-hidden="true" className="grid gap-1.5">
            <span
              className={cx(
                'h-0.5 w-5 rounded-full bg-current transition',
                menuOpen && 'translate-y-2 rotate-45',
              )}
            />
            <span
              className={cx(
                'h-0.5 w-5 rounded-full bg-current transition',
                menuOpen && 'opacity-0',
              )}
            />
            <span
              className={cx(
                'h-0.5 w-5 rounded-full bg-current transition',
                menuOpen && '-translate-y-2 -rotate-45',
              )}
            />
          </span>
        </button>
      </Container>

      <div
        className={cx(
          'max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white-100/8 lg:hidden',
          menuOpen ? 'block' : 'hidden',
        )}
        id="mobile-navigation"
      >
        <Container className="py-4">
          <nav aria-label="Mobile primary" className="space-y-3">
            {primaryNavItems.map((item, index) => (
              <Link
                className="block rounded-[0.875rem] border border-slate-700 bg-slate-800/70 px-4 py-3 text-base font-medium text-white-100 transition hover:border-blue-500/40 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
                ref={index === 0 ? firstLinkRef : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <Button
                href="/products/statstrike"
                variant="secondary"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                Explore StatStrike
              </Button>
              <Button
                href="/contact"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                Request a Demo
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
