import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { CricketAnalyticsHUD } from '@/components/ui/cricket-analytics-hud';
import { cx } from '@/lib/utils';

type MediaFrameProps = {
  src?: string;
  alt?: string;
  title?: string;
  caption?: string;
  credit?: string;
  className?: string;
};

export function MediaFrame({
  src,
  alt,
  title,
  caption,
  credit,
  className,
}: MediaFrameProps) {
  return (
    <Card className={cx('overflow-hidden p-0', className)} tone="contrast">
      <div className="relative min-h-[22rem] w-full bg-gradient-to-br from-ink-900 via-slate-800 to-ink-950">
        {src && alt?.trim() ? (
          <Image
            alt={alt.trim()}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            src={src}
          />
        ) : (
          <div className="relative flex h-full min-h-[22rem] w-full flex-col">
            <CricketAnalyticsHUD className="rounded-none border-none shadow-none" />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-700/80 bg-slate-950/80 px-4 py-2 font-mono text-[11px] text-grey-300">
              <span className="font-semibold uppercase tracking-wider text-blue-400">
                Product overview
              </span>
              <span className="text-[10px]">
                Contact us to discuss the product and request a demonstration.
              </span>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(237,28,36,0.14),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(74,58,56,0.14),_transparent_40%)]" />
      </div>
      {title || caption || (src && credit) ? (
        <div className="space-y-2 border-t border-slate-700 px-5 py-4">
          {title ? (
            <div className="text-sm font-semibold text-white-100">{title}</div>
          ) : null}
          {caption ? (
            <p className="text-sm leading-6 text-grey-300">{caption}</p>
          ) : null}
          {src && credit ? (
            <p className="text-sm leading-6 text-grey-300">
              Image credit: {credit}
            </p>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
