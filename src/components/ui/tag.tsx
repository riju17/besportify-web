import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/utils';

type TagProps = {
  children: ReactNode;
  tone?: 'default' | 'green' | 'blue' | 'subtle';
  pulse?: boolean;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;

const toneClasses: Record<NonNullable<TagProps['tone']>, string> = {
  default:
    'border-slate-700/80 bg-slate-800/70 text-white-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]',
  subtle: 'border-slate-700/60 bg-transparent text-grey-300',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-500 shadow-[0_0_12px_rgba(237,28,36,0.12)]',
  green:
    'border-green-400/35 bg-green-400/10 text-green-400 shadow-[0_0_12px_rgba(47,157,88,0.12)]',
};

const pulseColors: Record<NonNullable<TagProps['tone']>, string> = {
  default: 'bg-white-100',
  subtle: 'bg-grey-300',
  blue: 'bg-blue-500',
  green: 'bg-green-400',
};

export function Tag({
  children,
  tone = 'default',
  pulse = false,
  className,
  ...rest
}: TagProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md transition-colors duration-300',
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      {pulse ? (
        <span
          aria-hidden="true"
          className={cx(
            'h-1.5 w-1.5 shrink-0 rounded-full animate-telemetry-pulse',
            pulseColors[tone],
          )}
        />
      ) : null}
      <span>{children}</span>
    </span>
  );
}
