import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/state';
import { Tag } from '@/components/ui/tag';
import { MetricCard } from '@/components/ui/metric';
import { TestimonialCard } from '@/components/ui/testimonial';
import { MediaFrame } from '@/components/ui/media-frame';
import { PortableTextRenderer } from '@/components/content/portable-text';
import { Section } from '@/components/layout/section';
import { JsonLd } from '@/components/content/json-ld';
import { getSiteUrl } from '@/lib/env';
import { statstrikeDefaults, type StatStrikePageData } from '@/lib/statstrike';

type StatStrikePageProps = {
  data: StatStrikePageData;
  hideHero?: boolean;
};

function isRenderableCapability(
  capability: StatStrikePageData['capabilities'][number],
) {
  return capability.status === 'live' && typeof capability.title === 'string';
}

function isRenderableMetric(metric: StatStrikePageData['metrics'][number]) {
  return Boolean(metric.label && metric.value);
}

function isRenderableTestimonial(
  testimonial: StatStrikePageData['testimonials'][number],
) {
  return Boolean(testimonial.quote && testimonial.authorName);
}

export function StatStrikePageContent({
  data,
  hideHero = false,
}: StatStrikePageProps) {
  const productName = data.product?.name?.trim() || 'StatStrike';
  const pageUrl = `${getSiteUrl()}/products/statstrike`;
  const pageTitle =
    data.product?.seo?.title?.trim() ||
    'StatStrike Cricket Intelligence Platform | BeSportify';
  const pageDescription =
    data.product?.seo?.description?.trim() || statstrikeDefaults.body;
  const heroAlt =
    data.product?.heroMedia?.alt?.trim() || `${productName} preview`;
  const heroTitle =
    data.product?.heroMedia?.caption?.trim() || `${productName} preview`;
  const heroCaption =
    data.product?.heroMedia?.credit?.trim() ||
    data.product?.heroMedia?.source?.trim() ||
    'Approved product media appears only when a real asset exists.';
  const liveCapabilities = data.capabilities.filter(isRenderableCapability);
  const publishedMetrics = data.metrics.filter(isRenderableMetric);
  const publishedTestimonials = data.testimonials.filter(
    isRenderableTestimonial,
  );
  const hasProofData =
    publishedMetrics.length > 0 || publishedTestimonials.length > 0;
  const disclaimerId = 'statstrike-disclaimer';

  return (
    <div className="space-y-10 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: pageTitle,
          description: pageDescription,
          url: pageUrl,
          mainEntity: {
            '@type': 'Product',
            name: productName,
            description: pageDescription,
            url: pageUrl,
            image: data.productImageSrc || undefined,
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${getSiteUrl()}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Products',
                item: `${getSiteUrl()}/products`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'StatStrike',
                item: pageUrl,
              },
            ],
          },
        }}
      />

      {!hideHero && (
        <Section className="pt-10 sm:pt-14 lg:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-6">
              <Tag tone="green">{statstrikeDefaults.eyebrow}</Tag>
              <div className="max-w-3xl space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white-100 sm:text-5xl lg:text-6xl">
                  {statstrikeDefaults.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-grey-300">
                  {statstrikeDefaults.body}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact">Request a Demo</Button>
                <Button href={data.loginUrl} variant="secondary">
                  StatStrike Login
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-white-100/10 pt-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-grey-300">
                    TELEMETRY
                  </span>
                  <div className="font-semibold text-green-400">
                    PITCH &amp; HAWKEYE
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-grey-300">
                    GEOMETRY
                  </span>
                  <div className="font-semibold text-blue-500">
                    360° WAGON RADAR
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-grey-300">
                    DYNAMICS
                  </span>
                  <div className="font-semibold text-white-100">
                    MATCH PHASE MODEL
                  </div>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-grey-300">
                StatStrike is the current flagship product and the public site
                only describes verified live capabilities or clearly marked
                approved statuses.
              </p>
            </div>

            <MediaFrame
              alt={heroAlt}
              caption={heroCaption}
              credit={data.product?.heroMedia?.credit}
              src={data.productImageSrc ?? undefined}
              title={heroTitle}
            />
          </div>
        </Section>
      )}

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-5">
            <Tag tone="subtle">Problem</Tag>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
                {statstrikeDefaults.problemTitle}
              </h2>
              <p className="text-base leading-7 text-grey-300">
                {statstrikeDefaults.problemBody}
              </p>
            </div>
            <div className="rounded-[0.875rem] border border-slate-700 bg-slate-800/60 p-4">
              <div className="text-sm font-semibold text-white-100">
                {statstrikeDefaults.audienceTitle}
              </div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-grey-300 sm:grid-cols-2">
                {statstrikeDefaults.audienceItems.map((item) => (
                  <li key={item.title}>
                    <span className="font-medium text-white-100">
                      {item.title}
                    </span>
                    <span className="block">{item.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="space-y-5" tone="bordered">
            <Tag tone="green">Product identity</Tag>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
                Built for cricket decision-makers
              </h2>
              <p className="text-base leading-7 text-grey-300">
                StatStrike is designed to structure match, player, team, and
                competition information so the right questions are easier to ask
                and discuss.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[0.875rem] border border-slate-700 bg-slate-800/60 p-4">
                <div className="text-sm font-semibold text-white-100">
                  Evidence first
                </div>
                <p className="mt-2 text-sm leading-6 text-grey-300">
                  Public claims stay tied to approved content and visible
                  product states.
                </p>
              </div>
              <div className="rounded-[0.875rem] border border-slate-700 bg-slate-800/60 p-4">
                <div className="text-sm font-semibold text-white-100">
                  Review-ready
                </div>
                <p className="mt-2 text-sm leading-6 text-grey-300">
                  Structured views make preparation and selection discussions
                  easier to follow.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <Tag tone="green">Verified live capabilities</Tag>
            <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
              {statstrikeDefaults.capabilityTitle}
            </h2>
            <p className="text-base leading-7 text-grey-300">
              {statstrikeDefaults.capabilityBody}
            </p>
          </div>

          {liveCapabilities.length ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {liveCapabilities.map((capability, idx) => (
                <Card
                  className="space-y-4"
                  key={capability._id ?? capability.title ?? 'capability'}
                >
                  <div className="flex items-center justify-between border-b border-white-100/5 pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag tone="green">Live</Tag>
                      {capability.audience ? (
                        <Tag tone="subtle">{capability.audience}</Tag>
                      ) : null}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-green-400/80">
                      TELEMETRY // 0{idx + 1}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight text-white-100">
                      {capability.title}
                    </h3>
                    {capability.summary ? (
                      <p className="text-base leading-7 text-grey-300">
                        {capability.summary}
                      </p>
                    ) : null}
                  </div>
                  {capability.details?.length ? (
                    <PortableTextRenderer value={capability.details} />
                  ) : null}
                  {capability.evidence ? (
                    <p className="text-sm leading-6 text-grey-300">
                      <span className="font-semibold text-white-100">
                        Evidence:
                      </span>{' '}
                      {capability.evidence}
                    </p>
                  ) : null}
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              actionHref="/contact"
              actionLabel="Request a Demo"
              description="Approved live capabilities are not published yet. The page remains useful without inventing feature claims."
              title="No approved live capabilities yet"
            />
          )}
        </div>
      </Section>

      <Section>
        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <Tag tone="green">How it works</Tag>
            <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
              {statstrikeDefaults.workflowTitle}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {statstrikeDefaults.workflowSteps.map((step, index) => (
              <Card className="space-y-4" key={step.title}>
                <div className="flex items-center justify-between gap-4">
                  <Tag tone="subtle">0{index + 1}</Tag>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-grey-300">
                    {index === 0
                      ? 'PHASE_INGEST'
                      : index === 1
                        ? 'PHASE_VALIDATE'
                        : index === 2
                          ? 'PHASE_MODEL'
                          : 'PHASE_DELIVER'}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight text-white-100">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-6 text-grey-300">{step.body}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <Tag tone="green">Approved proof</Tag>
            <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
              {statstrikeDefaults.proofTitle}
            </h2>
            <p className="text-base leading-7 text-grey-300">
              Use approved screenshots, testimonials, and verified metrics only.
            </p>
          </div>

          {hasProofData ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
                  Verified metrics
                </div>
                {publishedMetrics.length ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {publishedMetrics.map((metric) => (
                      <MetricCard
                        key={metric._id ?? metric.label ?? 'metric'}
                        label={metric.label ?? 'Metric'}
                        note={
                          metric.evidenceNote?.trim() ||
                          metric.source?.trim() ||
                          undefined
                        }
                        value={`${metric.value ?? ''}${metric.unit ? ` ${metric.unit}` : ''}`.trim()}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    actionHref="/contact"
                    actionLabel="Request a Demo"
                    description={statstrikeDefaults.proofEmptyBody}
                    title={statstrikeDefaults.proofEmptyTitle}
                  />
                )}
              </div>

              <div className="space-y-4">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
                  Approved testimonials
                </div>
                {publishedTestimonials.length ? (
                  <div className="grid gap-4">
                    {publishedTestimonials.map((testimonial) => (
                      <TestimonialCard
                        author={testimonial.authorName ?? 'Approved author'}
                        key={
                          testimonial._id ??
                          testimonial.authorName ??
                          'testimonial'
                        }
                        organisation={testimonial.organisation ?? undefined}
                        quote={testimonial.quote ?? ''}
                        role={testimonial.authorRole ?? undefined}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    actionHref="/contact"
                    actionLabel="Request a Demo"
                    description={statstrikeDefaults.proofEmptyBody}
                    title={statstrikeDefaults.proofEmptyTitle}
                  />
                )}
              </div>
            </div>
          ) : (
            <EmptyState
              actionHref="/contact"
              actionLabel="Request a Demo"
              description={statstrikeDefaults.proofEmptyBody}
              title={statstrikeDefaults.proofEmptyTitle}
            />
          )}

          <Card
            className="space-y-4 border border-slate-700/80 bg-slate-800/60"
            id={disclaimerId}
          >
            <Tag tone="subtle">Disclaimer</Tag>
            <p className="max-w-3xl text-base leading-7 text-grey-300">
              {statstrikeDefaults.disclaimer}
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="space-y-4">
            <div className="space-y-3">
              <Tag tone="green">FAQ</Tag>
              <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
                {statstrikeDefaults.faqTitle}
              </h2>
            </div>
            <Accordion
              items={statstrikeDefaults.faqItems.map((item) => ({
                title: item.question,
                content: item.answer,
              }))}
            />
          </Card>

          <Card className="space-y-5 border border-green-400/20 bg-gradient-to-br from-slate-800/80 via-slate-800/70 to-ink-900/85">
            <Tag tone="green">Next step</Tag>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
                {statstrikeDefaults.ctaTitle}
              </h2>
              <p className="text-base leading-7 text-grey-300">
                {statstrikeDefaults.ctaBody}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact">Request a Demo</Button>
              <Button href="/products" variant="secondary">
                Explore Products
              </Button>
            </div>
            <p className="text-sm leading-6 text-grey-300">
              The public page does not imply guaranteed outcomes, and any
              product fit discussion should be confirmed with the BeSportify
              team.
            </p>
          </Card>
        </div>
      </Section>
    </div>
  );
}
