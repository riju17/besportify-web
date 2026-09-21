import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InlineLink } from '@/components/ui/link';
import { MediaFrame } from '@/components/ui/media-frame';
import { Tag } from '@/components/ui/tag';
import { TestimonialCard } from '@/components/ui/testimonial';
import { Section } from '@/components/layout/section';
import { resolveLink, statstrikeDefaults } from '@/lib/homepage';
import type { HomepagePageData } from '@/lib/homepage-data';

function buttonProps(
  link: {
    href: string;
    external: boolean;
    label: string;
  } | null,
  fallbackLabel: string,
  fallbackHref: string,
) {
  return {
    href: link?.href ?? fallbackHref,
    external: link?.external,
    label: link?.label || fallbackLabel,
  };
}

export function HomepageSlice({
  data,
  hideHero = false,
}: {
  data: HomepagePageData;
  hideHero?: boolean;
}) {
  const companyName = data.siteSettings?.companyName ?? 'BeSportify';
  const hero = data.homepage;
  const product = data.product;
  const partners = data.partners ?? [];
  const metrics = data.metrics ?? [];
  const caseStudies = data.caseStudies ?? [];
  const insights = data.insights ?? [];

  const heroPrimary = buttonProps(
    resolveLink(hero?.heroPrimaryCta),
    statstrikeDefaults.secondaryCtaLabel,
    statstrikeDefaults.secondaryCtaHref,
  );
  const heroSecondary = buttonProps(
    resolveLink(hero?.heroSecondaryCta),
    statstrikeDefaults.primaryCtaLabel,
    statstrikeDefaults.primaryCtaHref,
  );

  const productSummary = product?.summary ?? statstrikeDefaults.summary;
  const productName = product?.name ?? statstrikeDefaults.title;
  const productAccent = product?.accent === 'statstrike' ? 'green' : 'blue';
  const productVisualCaption =
    product?.heroMedia?.caption ??
    'Approved product media is shown here when available. The layout remains stable if media is not yet supplied.';
  const productPrimaryLink = buttonProps(
    resolveLink(product?.cta?.link),
    statstrikeDefaults.primaryCtaLabel,
    statstrikeDefaults.primaryCtaHref,
  );
  const productSecondaryLink = {
    href: '/contact',
    external: false,
    label: 'Request a Demo',
  };

  return (
    <div className="space-y-12 pb-24">
      {!hideHero && (
        <Section className="pt-8 sm:pt-12 lg:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Tag tone="green" pulse>
                  {hero?.heroEyebrow ?? `${companyName} Intelligence Layer`}
                </Tag>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-grey-300">
                  CRICKET-FIRST PRODUCT FOCUS
                </span>
              </div>

              <div className="max-w-3xl space-y-4">
                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white-100 sm:text-5xl lg:text-6xl">
                  {hero?.heroTitle ?? homepageTitleFallback}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-grey-300">
                  {hero?.heroBody ?? homepageBodyFallback}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  external={heroPrimary.external}
                  href={heroPrimary.href}
                  variant="primary"
                  size="lg"
                >
                  {heroPrimary.label}
                </Button>
                <Button
                  external={heroSecondary.external}
                  href={heroSecondary.href}
                  variant="secondary"
                  size="lg"
                >
                  {heroSecondary.label}
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-grey-300 border-t border-white-100/8">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-telemetry-pulse" />
                  <span>STRUCTURED SPORTING DATA</span>
                  <span>PITCH MAP &amp; HAWKEYE TRAJECTORY</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-telemetry-pulse" />
                  <span>DECISION SUPPORT WORKFLOWS</span>
                  <span>360° WAGON WHEEL RADAR</span>
                </div>
                <div className="text-grey-300">SPORTS TECHNOLOGY</div>
                <div className="flex items-center gap-2 text-grey-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-telemetry-pulse" />
                  <span>MATCH PHASE DYNAMICS</span>
                </div>
              </div>
            </div>

            <Card
              className="relative space-y-4 overflow-hidden p-6"
              tone="contrast"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white-100/10 pb-3">
                <Tag tone={productAccent} pulse>
                  {statstrikeDefaults.eyebrow}
                </Tag>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-green-400">
                  LIVE // TELEMETRY HUD
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white-100 sm:text-3xl">
                  {productName}
                </h2>
                <p className="max-w-xl text-sm leading-6 text-grey-300">
                  {productSummary}
                </p>
              </div>
              <MediaFrame
                alt={productName}
                caption={productVisualCaption}
                credit={product?.heroMedia?.credit}
                className="border border-slate-700/80 shadow-2xl"
                src={data.productImageSrc ?? undefined}
                title={productName}
              />
            </Card>
          </div>
        </Section>
      )}

      <div id="homepage-capabilities" className="scroll-mt-24">
        <Section>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="space-y-4 rounded-2xl border border-white/10 bg-[#0d121a]/85 p-6 sm:p-8 backdrop-blur-xl shadow-2xl hover:border-white/20">
              <Tag tone="blue">Product philosophy</Tag>
              <h2 className="text-3xl font-semibold tracking-tight text-white-100 sm:text-4xl">
                {hero?.philosophyTitle ?? homepagePhilosophyTitleFallback}
              </h2>
              <p className="text-base leading-7 text-grey-300">
                {hero?.philosophyBody ?? homepagePhilosophyBodyFallback}
              </p>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white-100/8 pb-2">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-green-400">
                    CRICKET DECISION ENGINE // LENGTH TELEMETRY
                  </span>
                  <span className="font-mono text-[10px] text-grey-300">
                    SAMPLE METRICS
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between font-mono text-xs text-grey-300">
                    <span>Pitch distribution target</span>
                    <span className="text-white-100">Good length focus</span>
                  </div>
                  <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-700/60">
                    <div
                      className="bg-green-400 transition-all duration-500"
                      style={{ width: '44%' }}
                      title="Good Length: 44%"
                    />
                    <div
                      className="bg-blue-500 transition-all duration-500"
                      style={{ width: '28%' }}
                      title="Full Length: 28%"
                    />
                    <div
                      className="bg-amber-400 transition-all duration-500"
                      style={{ width: '18%' }}
                      title="Short Length: 18%"
                    />
                    <div
                      className="bg-purple-400 transition-all duration-500"
                      style={{ width: '10%' }}
                      title="Yorker: 10%"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-1 pt-1 font-mono text-[10px] text-grey-300">
                    <div>
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                      Good 44%
                    </div>
                    <div>
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
                      Full 28%
                    </div>
                    <div>
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Short 18%
                    </div>
                    <div>
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-purple-400" />
                      Yorker 10%
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="space-y-5 rounded-2xl border border-white/10 bg-[#0d121a]/85 p-6 sm:p-8 backdrop-blur-xl shadow-2xl hover:border-white/20">
              <div className="flex flex-wrap items-center gap-3">
                <Tag tone="green">{statstrikeDefaults.eyebrow}</Tag>
                <Tag tone="subtle">Product feature</Tag>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-tight text-white-100 sm:text-4xl">
                  {productName}
                </h2>
                <p className="max-w-2xl text-base leading-7 text-grey-300">
                  {productSummary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/5 p-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-grey-300">
                    RADAR COVERAGE
                  </span>
                  <div className="text-sm font-semibold text-green-400 sm:text-base">
                    360° Wagon Wheel
                  </div>
                  <p className="text-[11px] text-grey-300">
                    Full field coordinate mapping
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-grey-300">
                    TRAJECTORY ANALYSIS
                  </span>
                  <div className="text-sm font-semibold text-blue-500 sm:text-base">
                    Hawkeye Arc
                  </div>
                  <p className="text-[11px] text-grey-300">
                    Release, pitch, and stump line
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  external={productPrimaryLink.external}
                  href={productPrimaryLink.href}
                >
                  {productPrimaryLink.label}
                </Button>
                <Button
                  external={productSecondaryLink.external}
                  href={productSecondaryLink.href}
                  variant="secondary"
                >
                  {productSecondaryLink.label}
                </Button>
              </div>
              <p className="text-sm leading-6 text-grey-300">
                Explore the product overview or contact us to discuss your
                workflow and the features currently available.
              </p>
            </Card>
          </div>
        </Section>
      </div>

      {partners.length ? (
        <Section>
          <div className="space-y-5">
            <SectionHeading
              label="Trusted relationships"
              title="Built with sporting organisations"
              body="Approved relationships and collaborations are shown here as they become publishable."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((partner) => (
                <Card
                  className="space-y-2 rounded-2xl border border-white/10 bg-[#0d121a]/85 p-6 backdrop-blur-xl shadow-xl hover:border-white/20"
                  key={partner._id ?? partner.name}
                >
                  <div className="text-lg font-semibold text-white-100">
                    {partner.name}
                  </div>
                  {partner.relationshipWording ? (
                    <p className="text-sm leading-6 text-grey-300">
                      {partner.relationshipWording}
                    </p>
                  ) : null}
                </Card>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {metrics.length ? (
        <Section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <Card
                className="space-y-2 rounded-2xl border border-white/10 bg-[#0d121a]/85 p-6 backdrop-blur-xl shadow-xl hover:border-red-500/30"
                key={metric._id ?? metric.label}
              >
                <div className="text-3xl font-semibold tracking-tight text-white-100">
                  {metric.value}
                  {metric.unit ? (
                    <span className="ml-1 text-lg text-red-400">
                      {metric.unit}
                    </span>
                  ) : null}
                </div>
                <div className="text-sm font-semibold text-white-100">
                  {metric.label}
                </div>
                {metric.evidenceNote ? (
                  <p className="text-xs leading-5 text-grey-300">
                    {metric.evidenceNote}
                  </p>
                ) : null}
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      {caseStudies.length || data.testimonial ? (
        <Section>
          <div className="grid gap-5 lg:grid-cols-2">
            {caseStudies[0] ? (
              <Card className="space-y-4 rounded-2xl border border-white/10 bg-[#0d121a]/85 p-6 backdrop-blur-xl shadow-xl hover:border-white/20">
                <Tag tone="green">Featured case study</Tag>
                <h2 className="text-2xl font-semibold tracking-tight text-white-100">
                  {caseStudies[0].title}
                </h2>
                {caseStudies[0].client ? (
                  <p className="text-sm text-grey-300">
                    {caseStudies[0].client}
                  </p>
                ) : null}
                {caseStudies[0].challenge ? (
                  <p className="text-base leading-7 text-grey-300">
                    {caseStudies[0].challenge}
                  </p>
                ) : null}
                {caseStudies[0].outcome ? (
                  <p className="text-base leading-7 text-white-100">
                    {caseStudies[0].outcome}
                  </p>
                ) : null}
                <InlineLink
                  href={`/case-studies/${caseStudies[0].slug?.current ?? ''}`}
                >
                  Read the case study
                </InlineLink>
              </Card>
            ) : null}
            {data.testimonial?.quote && data.testimonial.authorName ? (
              <TestimonialCard
                author={data.testimonial.authorName}
                organisation={data.testimonial.organisation ?? undefined}
                quote={data.testimonial.quote}
                role={data.testimonial.authorRole ?? undefined}
              />
            ) : null}
          </div>
        </Section>
      ) : null}

      {insights.length >= 3 ? (
        <Section>
          <div className="space-y-5">
            <SectionHeading
              label="Latest insights"
              title="Useful thinking for sporting decisions"
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {insights.map((insight) => (
                <Card
                  className="space-y-4 rounded-2xl border border-white/10 bg-[#0d121a]/85 p-6 backdrop-blur-xl shadow-xl hover:border-white/20"
                  key={insight._id ?? insight.title}
                >
                  <Tag tone="subtle">
                    {insight.category?.title ?? 'Insight'}
                  </Tag>
                  <h2 className="text-xl font-semibold tracking-tight text-white-100">
                    {insight.title}
                  </h2>
                  <p className="text-sm leading-6 text-grey-300">
                    {insight.keyTakeawaySummary ?? insight.excerpt}
                  </p>
                  <InlineLink href={`/insights/${insight.slug?.current ?? ''}`}>
                    Read insight
                  </InlineLink>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <Section>
        <Card
          className="relative overflow-hidden space-y-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d121a]/95 via-[#0d121a]/80 to-[#09080a]/95 p-8 shadow-2xl backdrop-blur-2xl hover:border-red-500/30"
          tone="contrast"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-12 -translate-y-12 rounded-full bg-red-500/10 blur-3xl" />
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag tone="blue" pulse>
                Structured Intelligence
              </Tag>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-grey-300">
                Approved Workflow Model
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white-100 sm:text-4xl">
              Precision Intelligence Flow: Ingest, Model, and Deliver
            </h2>
            <p className="max-w-3xl text-base leading-7 text-grey-300">
              Useful sports technology connects structured information with the
              decisions teams, analysts, and organisations need to make. Our
              workflow keeps communication clear, reviewable, and grounded in
              approved evidence.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <WorkflowStep
              index="01"
              title="Structure the information"
              body="Organise relevant sporting data, context, and questions into a clear working model."
            />
            <WorkflowStep
              index="02"
              title="Apply sporting context"
              body="Interpret information against the competition, users, and decision it is meant to support."
            />
            <WorkflowStep
              index="03"
              title="Deliver clear intelligence"
              body="Present approved findings through practical workflows, products, and reports."
            />
          </div>
        </Card>
      </Section>
    </div>
  );
}

const homepageTitleFallback = 'Products built around sporting decisions';

const homepageBodyFallback =
  'BeSportify develops technology that brings data, analysis, and sporting context into practical workflows. Our current flagship product is StatStrike.';

const homepagePhilosophyTitleFallback =
  'Start with the decision, not the dashboard';

const homepagePhilosophyBodyFallback =
  'A useful sports product should answer a real question, fit the way its users work, and make complex information easier to act upon. That principle guides how BeSportify designs products and analytical tools.';

function WorkflowStep({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <article className="group relative rounded-[1rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-red-500/40 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-red-400">
          {`// ${index}`}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-slate-600 transition-colors duration-300 group-hover:bg-red-400" />
      </div>
      <div className="mt-3 text-lg font-semibold text-white-100">{title}</div>
      <p className="mt-2 text-sm leading-6 text-grey-300">{body}</p>
    </article>
  );
}

function SectionHeading({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="space-y-3">
      <Tag tone="blue">{label}</Tag>
      <h2 className="text-3xl font-semibold tracking-tight text-white-100 sm:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="max-w-3xl text-base leading-7 text-grey-300">{body}</p>
      ) : null}
    </div>
  );
}
