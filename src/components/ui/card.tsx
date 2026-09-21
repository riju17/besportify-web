import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/utils';

type CardProps = {
  children: ReactNode;
  className?: string;
  tone?: 'surface' | 'bordered' | 'contrast' | 'telemetry';
  interactive?: boolean;
} & HTMLAttributes<HTMLElement>;

const toneClasses: Record<NonNullable<CardProps['tone']>, string> = {
  surface:
    'border border-slate-700/60 bg-slate-800/70 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-slate-600/80',
  bordered:
    'border border-slate-700/90 bg-slate-800/50 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:border-blue-500/40',
  contrast:
    'border border-blue-500/30 bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-ink-900/85 backdrop-blur-2xl shadow-[0_0_24px_rgba(237,28,36,0.08)] hover:border-blue-500/60 hover:shadow-[0_0_32px_rgba(237,28,36,0.14)]',
  telemetry: 'telemetry-card',
};

export function Card({
  children,
  className,
  tone = 'surface',
  interactive = true,
  ...rest
}: CardProps) {
  return (
    <article
      className={cx(
        'relative rounded-[1.25rem] p-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        interactive &&
          'hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0',
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </article>
  );
}
