'use client';

import type { ButtonHTMLAttributes } from 'react';
import { useThemeMode } from './theme-provider';
import { cx } from '@/lib/utils';

type ThemeToggleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'onClick'
>;

export function ThemeToggle({ className, ...rest }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeMode();
  const darkMode = theme === 'dark';

  return (
    <button
      aria-checked={darkMode}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`}
      title={`Switch to ${darkMode ? 'light' : 'dark'} theme`}
      suppressHydrationWarning
      className={cx(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-ink-900/70 text-grey-300 transition hover:border-blue-500/40 hover:text-white-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 motion-reduce:transition-none',
        className,
      )}
      onClick={toggleTheme}
      role="switch"
      type="button"
      {...rest}
    >
      {darkMode ? (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </svg>
      )}
    </button>
  );
}
