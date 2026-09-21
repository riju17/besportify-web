import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { Section } from '@/components/layout/section';

type PlaceholderPageProps = {
  title: string;
  description: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  aside?: ReactNode;
};

export function PlaceholderPage({
  title,
  description,
  eyebrow = 'Coming Soon',
  ctaLabel = 'Return home',
  ctaHref = '/',
  aside,
}: PlaceholderPageProps) {
  return (
    <Section className="pt-10 sm:pt-14 lg:pt-16">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <Tag tone="blue" pulse>
            {eyebrow}
          </Tag>
          <div className="max-w-3xl space-y-4">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white-100 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-grey-300">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={ctaHref}>{ctaLabel}</Button>
            <Button href="/products/statstrike" variant="secondary">
              Explore StatStrike
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {aside ?? (
            <Card className="space-y-4" tone="bordered">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
                Talent & Collaborations
              </div>
              <p className="text-sm leading-6 text-grey-300">
                Current roles and collaboration opportunities will be listed
                here when available.
              </p>
            </Card>
          )}
        </div>
      </div>
    </Section>
  );
}
