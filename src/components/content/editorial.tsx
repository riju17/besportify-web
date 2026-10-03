import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InlineLink } from '@/components/ui/link';
import { MediaFrame } from '@/components/ui/media-frame';
import { Tag } from '@/components/ui/tag';
import { Section } from '@/components/layout/section';
import { cx } from '@/lib/utils';

export type EditorialMetaItem = {
  label: string;
  value: string;
};

export type EditorialRelatedCard = {
  title: string;
  href: string;
  summary: string;
  eyebrow?: string;
};

export function EditorialHero({
  eyebrow,
  title,
  body,
  actions,
}: {
  eyebrow: string;
  title: string;
  body: string;
  actions?: ReactNode;
}) {
  return (
    <Section className="pt-10 sm:pt-14 lg:pt-16">
      <div className="max-w-3xl space-y-4">
        <Tag tone="blue">{eyebrow}</Tag>
        <h1 className="text-4xl font-semibold tracking-tight text-white-100 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="text-lg leading-8 text-grey-300">{body}</p>
        {actions ? (
          <div className="flex flex-wrap gap-3 pt-2">{actions}</div>
        ) : null}
      </div>
    </Section>
  );
}

export function EditorialMetaBar({ items }: { items: EditorialMetaItem[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Tag key={`${item.label}-${item.value}`} tone="subtle">
          {item.value}
        </Tag>
      ))}
    </div>
  );
}

export function EditorialFigure({
  src,
  alt,
  title,
  caption,
  credit,
}: {
  src?: string | null;
  alt: string;
  title?: string;
  caption?: string;
  credit?: string;
}) {
  return (
    <MediaFrame
      alt={alt}
      caption={caption}
      credit={credit}
      src={src ?? undefined}
      title={title}
    />
  );
}

export function EditorialTable({
  title,
  caption,
  columns,
  rows,
}: {
  title: string;
  caption?: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <Card className="space-y-4 overflow-hidden">
      <div className="space-y-2">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
          Table
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white-100">
          {title}
        </h2>
        {caption ? (
          <p className="max-w-3xl text-sm leading-6 text-grey-300">{caption}</p>
        ) : null}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-grey-300">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  className="border-b border-white-100/8 px-4 py-3 font-semibold text-white-100"
                  key={column}
                  scope="col"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    className={cx(
                      'border-b border-white-100/8 px-4 py-3 align-top leading-6',
                      cellIndex === 0 && 'font-medium text-white-100',
                    )}
                    key={`cell-${rowIndex}-${cellIndex}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function EditorialNote({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <Card className="space-y-3 border border-slate-700/80 bg-slate-800/60">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
        {title}
      </div>
      <p className="text-sm leading-6 text-grey-300">{body}</p>
    </Card>
  );
}

export function RelatedContentGrid({
  title,
  items,
}: {
  title: string;
  items: EditorialRelatedCard[];
}) {
  if (!items.length) {
    return null;
  }

  return (
    <Section>
      <div className="space-y-6">
        <div className="space-y-3">
          <Tag tone="blue">Related content</Tag>
          <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
            {title}
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {items.map((item) => (
            <Card className="space-y-4" key={item.href}>
              {item.eyebrow ? <Tag tone="subtle">{item.eyebrow}</Tag> : null}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-white-100">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-grey-300">
                  {item.summary}
                </p>
              </div>
              <InlineLink href={item.href}>Read more</InlineLink>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function EditorialActionRow({
  primary,
  secondary,
}: {
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button className="w-full sm:w-auto" href={primary.href}>
        {primary.label}
      </Button>
      {secondary ? (
        <Button
          className="w-full sm:w-auto"
          href={secondary.href}
          variant="secondary"
        >
          {secondary.label}
        </Button>
      ) : null}
    </div>
  );
}
