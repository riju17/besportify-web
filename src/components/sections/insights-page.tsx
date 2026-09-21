import type { PortableTextValue } from '@/components/content/portable-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/state';
import { InlineLink } from '@/components/ui/link';
import { Section } from '@/components/layout/section';
import { Tag } from '@/components/ui/tag';
import { JsonLd } from '@/components/content/json-ld';
import {
  EditorialActionRow,
  EditorialFigure,
  EditorialHero,
  EditorialMetaBar,
  EditorialTable,
} from '@/components/content/editorial';
import { PortableTextRenderer } from '@/components/content/portable-text';
import { getSiteUrl } from '@/lib/env';
import { resolveLink } from '@/lib/homepage';
import {
  type InsightsPageData,
  type InsightPageData,
  resolveEditorialImageSrc,
} from '@/lib/editorial';

function formatDate(value?: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function estimateReadingTime(
  value?: PortableTextValue | null,
  excerpt?: string | null,
) {
  const text = (value ?? [])
    .flatMap((block) => {
      if (
        block._type !== 'block' ||
        !Array.isArray((block as { children?: unknown }).children)
      ) {
        return [];
      }

      return (block as { children: Array<{ text?: string }> }).children.map(
        (child) => child.text ?? '',
      );
    })
    .join(' ')
    .trim();

  const words = `${text} ${excerpt ?? ''}`
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 180));
}

function insightHref(slug?: string | null) {
  return slug ? `/insights/${slug}` : '/insights';
}

function insightSummary(insight: InsightsPageData['insights'][number]) {
  return (
    insight.keyTakeawaySummary ?? insight.excerpt ?? 'Approved insight content.'
  );
}

function InsightCard({
  insight,
}: {
  insight: InsightsPageData['insights'][number];
}) {
  const published = formatDate(insight.publishedAt);
  const readingTime = estimateReadingTime(insight.body, insight.excerpt);
  const authorName = insight.author?.name ?? 'Approved author';
  const category = insight.category?.title ?? 'Insight';

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="green">{category}</Tag>
        {insight.author?.role ? (
          <Tag tone="subtle">{insight.author.role}</Tag>
        ) : null}
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white-100">
          {insight.title ?? 'Insight'}
        </h2>
        <p className="text-sm leading-6 text-grey-300">
          {authorName}
          {published ? ` • ${published}` : ''}
          {readingTime ? ` • ${readingTime} min read` : ''}
        </p>
      </div>
      <p className="text-sm leading-6 text-grey-300">
        {insightSummary(insight)}
      </p>
      <Button href={insightHref(insight.slug?.current)} variant="secondary">
        Read insight
      </Button>
    </Card>
  );
}

function InsightListEmptyState() {
  return (
    <EmptyState
      actionHref="/contact"
      actionLabel="Request a Demo"
      description="Approved insights are not published yet. The listing stays hidden from navigation until at least three substantive articles are ready."
      title="No approved insights yet"
    />
  );
}

function RelatedInsightsGrid({
  items,
}: {
  items: InsightsPageData['insights'];
}) {
  if (!items.length) {
    return null;
  }

  return (
    <Section>
      <div className="space-y-6">
        <div className="space-y-3">
          <Tag tone="blue">Related insights</Tag>
          <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
            More reading
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {items.slice(0, 2).map((item) => (
            <Card
              className="space-y-3"
              key={
                item._id ??
                item.slug?.current ??
                item.title ??
                'related-insight'
              }
            >
              <Tag tone="subtle">{item.category?.title ?? 'Insight'}</Tag>
              <h3 className="text-xl font-semibold tracking-tight text-white-100">
                {item.title ?? 'Insight'}
              </h3>
              <p className="text-sm leading-6 text-grey-300">
                {insightSummary(item)}
              </p>
              <InlineLink href={insightHref(item.slug?.current)}>
                Read more
              </InlineLink>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function InsightAuthors({ authors }: { authors: InsightsPageData['authors'] }) {
  if (!authors.length) {
    return null;
  }

  return (
    <Card className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
          Authors
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-white-100">
          Approved author identities
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {authors.slice(0, 6).map((author) => {
          const profile = resolveLink(author.profileLink);

          return profile ? (
            <Tag key={author._id ?? author.name ?? 'author'} tone="subtle">
              <InlineLink
                href={profile.href}
                external={profile.external}
                className="text-inherit no-underline"
              >
                {author.name ?? 'Author'}
              </InlineLink>
            </Tag>
          ) : (
            <Tag key={author._id ?? author.name ?? 'author'} tone="subtle">
              {author.name ?? 'Author'}
            </Tag>
          );
        })}
      </div>
    </Card>
  );
}

export function InsightsPageContent({ data }: { data: InsightsPageData }) {
  return (
    <div className="space-y-10 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Insights | BeSportify',
          description:
            'Read BeSportify perspectives on cricket analytics, player evaluation, match preparation, sports technology, and data quality.',
          url: `${getSiteUrl()}/insights`,
        }}
      />

      <EditorialHero
        eyebrow="Insights"
        title="Thinking beyond the scorecard"
        body="Practical perspectives on cricket analytics, player evaluation, match preparation, data quality, and sports technology."
        actions={
          <EditorialActionRow
            primary={{ href: '/contact', label: 'Request a Demo' }}
            secondary={{
              href: '/products/statstrike',
              label: 'Explore StatStrike',
            }}
          />
        }
      />

      <Section>
        <div className="space-y-6">
          {data.categories.length ? (
            <div className="flex flex-wrap gap-2">
              {data.categories.map((category) => (
                <Tag
                  key={category._id ?? category.title ?? 'category'}
                  tone="subtle"
                >
                  {category.title ?? 'Category'}
                </Tag>
              ))}
            </div>
          ) : null}

          {data.insights.length ? (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-5">
                {data.insights.map((insight) => (
                  <InsightCard
                    insight={insight}
                    key={
                      insight._id ??
                      insight.slug?.current ??
                      insight.title ??
                      'insight'
                    }
                  />
                ))}
              </div>
              <InsightAuthors authors={data.authors} />
            </div>
          ) : (
            <InsightListEmptyState />
          )}
        </div>
      </Section>
    </div>
  );
}

function ArticleMeta({
  items,
}: {
  items: Array<{ label: string; value: string | null | undefined }>;
}) {
  const rendered = items
    .filter((item) => Boolean(item.value))
    .map((item) => ({ label: item.label, value: item.value as string }));

  return <EditorialMetaBar items={rendered} />;
}

function InsightSection({
  title,
  body,
}: {
  title: string;
  body?: string | null;
}) {
  if (!body) {
    return null;
  }

  return (
    <Card className="space-y-3">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
        {title}
      </div>
      <p className="text-base leading-7 text-grey-300">{body}</p>
    </Card>
  );
}

export function InsightPageContent({ data }: { data: InsightPageData }) {
  const insight = data.insight;
  const readingTime = estimateReadingTime(insight?.body, insight?.excerpt);
  const heroSrc = insight?.heroImage
    ? resolveEditorialImageSrc(insight.heroImage)
    : null;
  const heroAlt =
    insight?.heroImage?.alt ?? insight?.title ?? 'Insight preview';
  const category = insight?.category?.title ?? 'Insight';
  const author = insight?.author?.name ?? 'Approved author';
  const relatedProduct = insight?.relatedProduct?.slug?.current
    ? {
        label: insight.relatedProduct.name ?? 'Relevant product',
        href: `/products/${insight.relatedProduct.slug.current}`,
      }
    : null;
  const relatedService = insight?.relatedService?.slug?.current
    ? {
        label: insight.relatedService.title ?? 'Relevant service',
        href: `/services/${insight.relatedService.slug.current}`,
      }
    : null;
  const metadata = [
    { label: 'Category', value: category },
    { label: 'Author', value: author },
    { label: 'Published', value: formatDate(insight?.publishedAt) },
    { label: 'Reading time', value: `${readingTime} min` },
  ];

  if (!insight) {
    return (
      <div className="space-y-10 pb-20">
        <Section className="pt-10 sm:pt-14 lg:pt-16">
          <EmptyState
            actionHref="/insights"
            actionLabel="Back to Insights"
            description="This insight is not available yet. Approved content has not been published for this slug."
            title="Insight not found"
          />
        </Section>
      </div>
    );
  }

  const relatedInsights = data.relatedInsights.filter(
    (item) => item.slug?.current !== insight.slug?.current,
  );
  const tableRows = [
    insight.centralQuestion
      ? ['Central question', insight.centralQuestion]
      : null,
    insight.keyTakeawaySummary
      ? ['Key takeaway', insight.keyTakeawaySummary]
      : null,
    insight.sourceNotes ? ['Data / source notes', insight.sourceNotes] : null,
    insight.limitations ? ['Limitations', insight.limitations] : null,
  ].filter(Boolean) as string[][];

  return (
    <div className="space-y-10 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: insight.title ?? 'Insight',
          description: insight.excerpt ?? undefined,
          datePublished: insight.publishedAt || undefined,
          dateModified: insight._updatedAt || undefined,
          author: insight.author?.name
            ? {
                '@type': 'Person',
                name: insight.author.name,
              }
            : undefined,
          mainEntityOfPage: `${getSiteUrl()}/insights/${insight.slug?.current ?? ''}`,
        }}
      />

      <EditorialHero
        eyebrow="Insights"
        title={insight.title ?? 'Insight'}
        body={insight.excerpt ?? 'Approved insight content.'}
        actions={
          <EditorialActionRow
            primary={{ href: '/contact', label: 'Request a Demo' }}
            secondary={{ href: '/insights', label: 'Back to Insights' }}
          />
        }
      />

      <Section>
        <div className="space-y-8">
          <ArticleMeta items={metadata} />

          {heroSrc ? (
            <EditorialFigure
              alt={heroAlt}
              caption={insight.heroImage?.caption ?? undefined}
              credit={insight.heroImage?.credit}
              src={heroSrc}
              title={insight.title ?? 'Insight preview'}
            />
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="space-y-6">
              <div className="space-y-3">
                <Tag tone="green">Central question</Tag>
                <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
                  {insight.centralQuestion ??
                    insight.excerpt ??
                    insight.title ??
                    'Insight'}
                </h2>
                {insight.keyTakeawaySummary ? (
                  <p className="text-base leading-7 text-grey-300">
                    {insight.keyTakeawaySummary}
                  </p>
                ) : null}
              </div>
              {insight.body ? (
                <PortableTextRenderer value={insight.body} />
              ) : null}
            </Card>

            <div className="space-y-4">
              <InsightSection
                title="Data / source notes"
                body={insight.sourceNotes}
              />
              <InsightSection title="Limitations" body={insight.limitations} />
              {tableRows.length ? (
                <EditorialTable
                  caption="This table pulls the article's editorial framing into one place so the central question, takeaway, and caveats are visible together."
                  columns={['Section', 'Summary']}
                  rows={tableRows}
                  title="Editorial summary"
                />
              ) : null}
            </div>
          </div>

          {(relatedProduct || relatedService) && (
            <Card className="space-y-4">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
                Relevant product or service
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedProduct ? (
                  <Tag tone="green">
                    <InlineLink
                      href={relatedProduct.href}
                      className="text-inherit no-underline"
                    >
                      {relatedProduct.label}
                    </InlineLink>
                  </Tag>
                ) : null}
                {relatedService ? (
                  <Tag tone="subtle">
                    <InlineLink
                      href={relatedService.href}
                      className="text-inherit no-underline"
                    >
                      {relatedService.label}
                    </InlineLink>
                  </Tag>
                ) : null}
              </div>
            </Card>
          )}

          <Card className="space-y-4 border border-green-400/20 bg-gradient-to-br from-slate-800/80 via-slate-800/70 to-ink-900/85">
            <div className="space-y-3">
              <Tag tone="green">Next step</Tag>
              <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
                Want to turn an insight into a workflow?
              </h2>
              <p className="text-base leading-7 text-grey-300">
                The article shows the framing. The product conversation is about
                whether the current approved feature set can support a real
                decision.
              </p>
            </div>
            <EditorialActionRow
              primary={{ href: '/contact', label: 'Request a Demo' }}
              secondary={{
                href: '/products/statstrike',
                label: 'Explore StatStrike',
              }}
            />
          </Card>
        </div>
      </Section>

      {relatedInsights.length ? (
        <RelatedInsightsGrid items={relatedInsights} />
      ) : null}
    </div>
  );
}
