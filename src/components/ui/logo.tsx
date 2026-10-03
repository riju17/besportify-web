import { cx } from '@/lib/utils';

export function BeSportifyLogo({
  className,
  markOnly = false,
}: {
  className?: string;
  markOnly?: boolean;
}) {
  return (
    <div
      className={cx('flex shrink-0 items-center gap-3 select-none', className)}
    >
      {markOnly ? (
        <span className="font-display text-lg font-bold text-white-100">
          BeSportify
        </span>
      ) : null}
      {!markOnly ? (
        <span className="flex shrink-0 flex-col justify-center leading-tight">
          <span className="whitespace-nowrap font-display text-base font-bold tracking-tight text-white-100">
            BeSportify
          </span>
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-grey-300 max-sm:hidden">
            Intelligence Layer
          </span>
        </span>
      ) : null}
    </div>
  );
}

export function StatStrikeBadge({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        'inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-green-400 backdrop-blur-md shadow-[0_0_12px_rgba(47,157,88,0.15)]',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-telemetry-pulse" />
      <span>STATSTRIKE // CRICKET HUD</span>
    </div>
  );
}
