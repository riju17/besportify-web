import { Card } from '@/components/ui/card';

type MetricProps = {
  value: string;
  label: string;
  note?: string;
  tag?: string;
};

export function MetricCard({ value, label, note, tag }: MetricProps) {
  return (
    <Card
      className="group relative flex h-full flex-col justify-between gap-3 overflow-hidden p-5"
      tone="bordered"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent transition-opacity group-hover:via-blue-500/80" />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-grey-300">
            {tag || 'CRICKET TELEMETRY'}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500/60 transition-all group-hover:bg-blue-500 group-hover:shadow-[0_0_8px_#ed1c24]" />
        </div>

        <div className="font-display text-3xl font-bold tracking-tight text-white-100 tabular-nums sm:text-4xl">
          {value}
        </div>
      </div>

      <div className="space-y-1 border-t border-white-100/5 pt-2">
        <div className="font-mono text-xs font-semibold uppercase tracking-wider text-grey-300 transition-colors group-hover:text-white-100">
          {label}
        </div>
        {note ? (
          <p className="text-xs leading-5 text-grey-300/90">{note}</p>
        ) : null}
      </div>
    </Card>
  );
}
