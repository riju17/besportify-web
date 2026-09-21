import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/state';
import { InlineLink } from '@/components/ui/link';
import { MediaFrame } from '@/components/ui/media-frame';
import { Section } from '@/components/layout/section';
import { Tag } from '@/components/ui/tag';
import { TestimonialCard } from '@/components/ui/testimonial';
import { JsonLd } from '@/components/content/json-ld';
import {
  EditorialActionRow,
  EditorialHero,
  EditorialMetaBar,
} from '@/components/content/editorial';
import { getSiteUrl } from '@/lib/env';
import {
  type CaseStudiesPageData,
  type CaseStudyPageData,
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

function caseStudyHref(slug?: string | null) {
  return slug ? `/case-studies/${slug}` : '/case-studies';
}

function relationSummary(caseStudy: {
  client?: string | null;
  relationship?: string | null;
  competitionContext?: string | null;
}) {
  return [
    caseStudy.client,
    caseStudy.relationship,
    caseStudy.competitionContext,
  ]
    .filter(Boolean)
    .join(' • ');
}

function CaseStudyCard({
  caseStudy,
}: {
  caseStudy: CaseStudiesPageData['caseStudies'][number];
}) {
  const heroImage = caseStudy.media?.[0] ?? null;
  const published = formatDate(caseStudy.publishedAt);

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Tag tone="green">{caseStudy.client ?? 'Case study'}</Tag>
        {caseStudy.relationship ? (
          <Tag tone="subtle">{caseStudy.relationship}</Tag>
        ) : null}
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white-100">
          {caseStudy.title ?? 'Case study'}
        </h2>
        <p className="text-sm leading-6 text-grey-300">
          {relationSummary(caseStudy)}
          {published ? ` • ${published}` : ''}
        </p>
      </div>
      {heroImage ? (
        <MediaFrame
          alt={heroImage.alt}
          caption={heroImage.caption}
          credit={heroImage.credit}
          src={resolveEditorialImageSrc(heroImage) ?? undefined}
          title={caseStudy.title ?? 'Case study preview'}
        />
      ) : null}
      <div className="grid gap-3 md:grid-cols-2">
        {caseStudy.challenge ? (
          <div className="rounded-[0.875rem] border border-slate-700 bg-slate-800/60 p-4">
            <div className="text-sm font-semibold text-white-100">
              Challenge
            </div>
            <p className="mt-2 text-sm leading-6 text-grey-300">
              {caseStudy.challenge}
            </p>
          </div>
        ) : null}
        {caseStudy.outcome ? (
          <div className="rounded-[0.875rem] border border-slate-700 bg-slate-800/60 p-4">
            <div className="text-sm font-semibold text-white-100">Outcome</div>
            <p className="mt-2 text-sm leading-6 text-grey-300">
              {caseStudy.outcome}
            </p>
          </div>
        ) : null}
      </div>
      <Button href={caseStudyHref(caseStudy.slug?.current)} variant="secondary">
        Read case study
      </Button>
    </Card>
  );
}

function CaseStudyEmptyState() {
  return (
    <EmptyState
      actionHref="/contact"
      actionLabel="Request a Demo"
      description="Approved case studies are not published yet. The route is available for preview, but the public listing stays hidden until at least one substantive approved case study is ready."
      title="No approved case studies yet"
    />
  );
}

export function CaseStudiesPageContent({
  data,
}: {
  data: CaseStudiesPageData;
}) {
  return (
    <div className="space-y-10 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Case Studies | BeSportify',
          description:
            'See how BeSportify applies sports technology and analytics to real performance, preparation, tournament, and commercial questions.',
          url: `${getSiteUrl()}/case-studies`,
        }}
      />

      <EditorialHero
        eyebrow="Case studies"
        title="Intelligence applied in the real world"
        body="Explore how BeSportify approaches sporting questions, structures evidence, and delivers intelligence that organisations can use."
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
        {data.caseStudies.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {data.caseStudies.map((caseStudy) => (
              <CaseStudyCard
                caseStudy={caseStudy}
                key={
                  caseStudy._id ??
                  caseStudy.slug?.current ??
                  caseStudy.title ??
                  'case-study'
                }
              />
            ))}
          </div>
        ) : (
          <CaseStudyEmptyState />
        )}
      </Section>
    </div>
  );
}

function SectionHeading({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body?: string | null;
}) {
  return (
    <div className="space-y-3">
      <Tag tone="green">{label}</Tag>
      <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
        {title}
      </h2>
      {body ? (
        <p className="text-base leading-7 text-grey-300">{body}</p>
      ) : null}
    </div>
  );
}

function DetailSection({
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

export function CaseStudyPageContent({ data }: { data: CaseStudyPageData }) {
  const caseStudy = data.caseStudy;
  const heroImage = caseStudy?.media?.[0] ?? null;
  const heroSrc = heroImage ? resolveEditorialImageSrc(heroImage) : null;
  const heroAlt = heroImage?.alt ?? caseStudy?.title ?? 'Case study preview';
  const relatedProduct = caseStudy?.relatedProduct?.slug?.current
    ? {
        label: caseStudy.relatedProduct.name ?? 'Relevant product',
        href: `/products/${caseStudy.relatedProduct.slug.current}`,
      }
    : null;
  const relatedService = caseStudy?.relatedService?.slug?.current
    ? {
        label: caseStudy.relatedService.title ?? 'Relevant service',
        href: `/services/${caseStudy.relatedService.slug.current}`,
      }
    : null;
  const testimonial = caseStudy?.approvedTestimonial;
  const testimonialVisible =
    testimonial?.quote && testimonial.authorName ? testimonial : null;
  const metadata = [
    caseStudy?.client ? { label: 'Client', value: caseStudy.client } : null,
    caseStudy?.relationship
      ? { label: 'Relationship', value: caseStudy.relationship }
      : null,
    caseStudy?.competitionContext
      ? { label: 'Context', value: caseStudy.competitionContext }
      : null,
    caseStudy?.publishedAt
      ? { label: 'Published', value: formatDate(caseStudy.publishedAt) ?? '' }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  if (!caseStudy) {
    return (
      <div className="space-y-10 pb-20">
        <Section className="pt-10 sm:pt-14 lg:pt-16">
          <EmptyState
            actionHref="/case-studies"
            actionLabel="Back to Case Studies"
            description="This case study is not available yet. Approved content has not been published for this slug."
            title="Case study not found"
          />
        </Section>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: caseStudy.title ?? 'Case study',
          description:
            caseStudy.challenge ||
            caseStudy.outcome ||
            caseStudy.relationship ||
            undefined,
          datePublished: caseStudy.publishedAt || undefined,
          mainEntityOfPage: `${getSiteUrl()}/case-studies/${caseStudy.slug?.current ?? ''}`,
        }}
      />

      <EditorialHero
        eyebrow="Case studies"
        title={caseStudy.title ?? 'Case study'}
        body={
          caseStudy.challenge ??
          'Approved case study content is structured around the client problem, the approach, and the outcome.'
        }
        actions={
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Request a Demo</Button>
            <Button href="/case-studies" variant="secondary">
              Back to Case Studies
            </Button>
          </div>
        }
      />

      <Section>
        <div className="space-y-8">
          <EditorialMetaBar items={metadata} />

          {heroImage ? (
            <MediaFrame
              alt={heroAlt}
              caption={heroImage.caption ?? undefined}
              credit={heroImage.credit}
              src={heroSrc ?? undefined}
              title={caseStudy.title ?? 'Case study preview'}
            />
          ) : null}

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <SectionHeading
                body="The case study follows the required editorial structure so the story stays tied to the client problem and the evidence."
                label="Story"
                title="What happened and why it mattered"
              />
              <DetailSection body={caseStudy.client} title="Client" />
              <DetailSection
                body={caseStudy.relationship}
                title="Relationship"
              />
              <DetailSection
                body={caseStudy.competitionContext}
                title="Competition / date / context"
              />
              <DetailSection body={caseStudy.challenge} title="Challenge" />
              <DetailSection
                body={caseStudy.whyItMattered}
                title="Why it mattered"
              />
            </div>

            <div className="space-y-4">
              <SectionHeading
                body="Deliverables and outcomes are separated so the page does not overclaim what the work did on its own."
                label="Evidence"
                title="Approach and impact"
              />
              <DetailSection body={caseStudy.approach} title="Approach" />
              <DetailSection
                body={caseStudy.dataAndScope}
                title="Data and scope"
              />
              <DetailSection
                body={caseStudy.intelligenceDelivered}
                title="Intelligence delivered"
              />
              <DetailSection
                body={caseStudy.application}
                title="How it was applied"
              />
              <DetailSection
                body={caseStudy.outcome}
                title="Verified outcome"
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="space-y-4">
              <SectionHeading
                body="Approved only if the client granted permission and the wording is business-approved."
                label="Permission"
                title="Approved testimonial"
              />
              {testimonialVisible ? (
                <TestimonialCard
                  author={testimonialVisible.authorName ?? 'Approved author'}
                  organisation={testimonialVisible.organisation ?? undefined}
                  quote={testimonialVisible.quote ?? ''}
                  role={testimonialVisible.authorRole ?? undefined}
                />
              ) : (
                <EmptyState
                  actionHref="/contact"
                  actionLabel="Request a Demo"
                  description="A public testimonial is not published for this case study yet."
                  title="No approved testimonial"
                />
              )}
            </Card>

            <Card className="space-y-4">
              <SectionHeading
                body="Limitations remain visible so the public page does not imply a guarantee or overstate scope."
                label="Boundaries"
                title="Limitations and confidentiality"
              />
              <DetailSection
                body={caseStudy.limitations}
                title="Limitations / confidentiality"
              />
              <div className="space-y-3">
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
              </div>
            </Card>
          </div>

          <Card className="space-y-4 border border-green-400/20 bg-gradient-to-br from-slate-800/80 via-slate-800/70 to-ink-900/85">
            <SectionHeading
              body="Use the contact route to discuss a similar challenge, required evidence, and the approval process."
              label="Next step"
              title="Want to discuss a similar problem?"
            />
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

      {data.relatedCaseStudies.length ? (
        <Section>
          <div className="space-y-6">
            <SectionHeading
              body="Related approved case studies stay close to the same editorial standard and approval controls."
              label="Related"
              title="More evidence"
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {data.relatedCaseStudies.slice(0, 2).map((related) => (
                <Card
                  className="space-y-3"
                  key={
                    related._id ??
                    related.slug?.current ??
                    related.title ??
                    'related-case-study'
                  }
                >
                  <Tag tone="subtle">{related.client ?? 'Case study'}</Tag>
                  <h3 className="text-xl font-semibold tracking-tight text-white-100">
                    {related.title ?? 'Case study'}
                  </h3>
                  <p className="text-sm leading-6 text-grey-300">
                    {related.challenge ??
                      related.outcome ??
                      'Approved case study content.'}
                  </p>
                  <Button
                    href={caseStudyHref(related.slug?.current)}
                    variant="secondary"
                  >
                    Read case study
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      ) : null}
    </div>
  );
}
