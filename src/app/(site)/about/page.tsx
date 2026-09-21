import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/layout/section';
import { Tag } from '@/components/ui/tag';
import { JsonLd } from '@/components/content/json-ld';
import { corporateDefaults, loadAboutPageData } from '@/lib/corporate-pages';
import { getSiteUrl } from '@/lib/env';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'About BeSportify | Sports Technology for Modern Sport',
    },
    description:
      'Learn why BeSportify is building practical sports-intelligence products and analytical solutions, beginning with cricket.',
    alternates: {
      canonical: '/about',
    },
  };
}

export default async function AboutPage() {
  const data = await loadAboutPageData();
  const companyName = data.siteSettings?.companyName?.trim() || 'BeSportify';

  return (
    <div className="space-y-10 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `About ${companyName}`,
          description: corporateDefaults.aboutBody,
          url: `${getSiteUrl()}/about`,
          mainEntity: {
            '@type': 'Organization',
            name: companyName,
            url: `${getSiteUrl()}/`,
            description: corporateDefaults.aboutBody,
          },
        }}
      />

      <Section className="pt-10 sm:pt-14 lg:pt-16">
        <div className="max-w-3xl space-y-4">
          <Tag tone="blue">About</Tag>
          <h1 className="text-4xl font-semibold tracking-tight text-white-100 sm:text-5xl lg:text-6xl">
            {corporateDefaults.aboutTitle}
          </h1>
          <p className="text-lg leading-8 text-grey-300">
            {corporateDefaults.aboutBody}
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <Card className="space-y-5">
            <div className="space-y-2">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
                Current focus and vision
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
                {companyName} is building practical sports intelligence
              </h2>
              <p className="text-base leading-7 text-grey-300">
                {corporateDefaults.aboutFocusBody}
              </p>
            </div>
            <div className="rounded-[0.875rem] border border-slate-700 bg-slate-800/60 p-4">
              <div className="text-sm font-semibold text-white-100">
                What we are focusing on now
              </div>
              <p className="mt-2 text-sm leading-6 text-grey-300">
                Performance, preparation, player evaluation, tournaments, and
                decision support across cricket-first workflows.
              </p>
            </div>
          </Card>

          <Card className="space-y-4" tone="bordered">
            <div className="space-y-2">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
                Founding story
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
                {corporateDefaults.aboutFoundingHeadline}
              </h2>
              <p className="text-base leading-7 text-grey-300">
                {corporateDefaults.aboutFoundingBody}
              </p>
            </div>
            <div className="rounded-[0.875rem] border border-dashed border-slate-700 bg-slate-800/50 p-4">
              <div className="text-sm font-semibold text-white-100">
                Approved inputs still required
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-grey-300">
                <li>Founders and founding year</li>
                <li>Original problem or experience</li>
                <li>How StatStrike developed</li>
                <li>Meaningful milestones</li>
                <li>Current team and operating model</li>
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
              Values
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
              How we work
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <Card>
              <div className="text-lg font-semibold text-white-100">
                Useful over impressive
              </div>
              <p className="mt-3 text-sm leading-6 text-grey-300">
                Analysis should answer a real question.
              </p>
            </Card>
            <Card>
              <div className="text-lg font-semibold text-white-100">
                Evidence with context
              </div>
              <p className="mt-3 text-sm leading-6 text-grey-300">
                Numbers become more useful when the sporting situation is
                understood.
              </p>
            </Card>
            <Card>
              <div className="text-lg font-semibold text-white-100">
                Clarity over complexity
              </div>
              <p className="mt-3 text-sm leading-6 text-grey-300">
                Advanced work should still be explainable to the people using
                it.
              </p>
            </Card>
            <Card>
              <div className="text-lg font-semibold text-white-100">
                Trust through accuracy
              </div>
              <p className="mt-3 text-sm leading-6 text-grey-300">
                Data quality, transparent assumptions, and honest limitations
                are essential.
              </p>
            </Card>
            <Card>
              <div className="text-lg font-semibold text-white-100">
                Build for the user
              </div>
              <p className="mt-3 text-sm leading-6 text-grey-300">
                Products should reflect how teams, analysts, and organisations
                actually work.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section>
        <Card className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
            Keep the conversation going
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-white-100">
                Want to talk through a sports intelligence problem?
              </h2>
              <p className="text-base leading-7 text-grey-300">
                Tell us the users, data, and decision context. We will respond
                with the most suitable next step.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact">Contact</Button>
              <Button href="/services" variant="secondary">
                Services
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
