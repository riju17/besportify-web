import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type StateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function LoadingState({ title, description }: StateProps) {
  return (
    <Card className="animate-pulse space-y-3">
      <div className="h-5 w-32 rounded-full bg-white-100/10" />
      <div className="h-4 w-full rounded-full bg-white-100/8" />
      <div className="h-4 w-5/6 rounded-full bg-white-100/8" />
      <p className="pt-2 text-sm text-grey-300">
        {title}: {description}
      </p>
    </Card>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: StateProps) {
  return (
    <Card className="space-y-4 border-dashed">
      <div className="text-lg font-semibold text-white-100">{title}</div>
      <p className="text-sm leading-6 text-grey-300">{description}</p>
      {actionLabel && actionHref ? (
        <Button href={actionHref} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}

export function ErrorState({
  title,
  description,
  actionLabel,
  actionHref,
}: StateProps) {
  return (
    <Card className="space-y-4 border border-danger/30 bg-danger/10">
      <div className="text-lg font-semibold text-white-100">{title}</div>
      <p className="text-sm leading-6 text-grey-300">{description}</p>
      {actionLabel && actionHref ? (
        <Button href={actionHref} variant="secondary">
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}

export function DisabledState({ title, description }: StateProps) {
  return (
    <Card className="space-y-4 opacity-70">
      <div className="text-lg font-semibold text-white-100">{title}</div>
      <p className="text-sm leading-6 text-grey-300">{description}</p>
      <div className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-grey-300">
        Disabled
      </div>
    </Card>
  );
}

export function LongContentState({ title, description }: StateProps) {
  return (
    <Card className="space-y-4">
      <div className="max-w-2xl text-2xl font-semibold leading-tight text-white-100 sm:text-3xl">
        {title}
      </div>
      <p className="max-w-2xl text-base leading-7 text-grey-300">
        {description}
      </p>
    </Card>
  );
}
