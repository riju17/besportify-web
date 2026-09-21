import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/state';
import { Section } from '@/components/layout/section';
import { Tag } from '@/components/ui/tag';
import { JsonLd } from '@/components/content/json-ld';
import { corporateDefaults, loadServicesPageData } from '@/lib/corporate-pages';
import { getSiteUrl } from '@/lib/env';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'Sports Analytics and Technology Services | BeSportify',
    },
    description:
      'Explore BeSportify services across performance analysis, scouting, tournament intelligence, dashboards, predictive modelling, and custom sports technology.',
    alternates: {
      canonical: '/services',
    },
  };
}

export default async function ServicesPage() {
  const data = await loadServicesPageData();
  const services = data.services.length
    ? data.services
    : corporateDefaults.servicesCatalog;

  return (
    <div className="space-y-10 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Services | BeSportify',
          description: corporateDefaults.servicesBody,
          url: `${getSiteUrl()}/services`,
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
                name: 'Services',
                item: `${getSiteUrl()}/services`,
              },
            ],
          },
        }}
      />

      <Section className="pt-10 sm:pt-14 lg:pt-16">
        <div className="max-w-3xl space-y-4">
          <Tag tone="blue">Services</Tag>
          <h1 className="text-4xl font-semibold tracking-tight text-white-100 sm:text-5xl lg:text-6xl">
            {corporateDefaults.servicesTitle}
          </h1>
          <p className="text-lg leading-8 text-grey-300">
            {corporateDefaults.servicesBody}
          </p>
        </div>
      </Section>

      <Section>
        {services.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((service) => (
              <Card
                key={service._id ?? service.title ?? 'service'}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Tag tone="subtle">Service</Tag>
                  {service.customer ? (
                    <Tag tone="blue">{service.customer}</Tag>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-white-100">
                    {service.title ?? 'Service'}
                  </h2>
                  {service.summary ? (
                    <p className="text-base leading-7 text-grey-300">
                      {service.summary}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {service.problem ? (
                    <div className="rounded-[0.875rem] border border-slate-700 bg-slate-800/60 p-4">
                      <div className="text-sm font-semibold text-white-100">
                        Problem
                      </div>
                      <p className="mt-2 text-sm leading-6 text-grey-300">
                        {service.problem}
                      </p>
                    </div>
                  ) : null}
                  {service.deliverable ? (
                    <div className="rounded-[0.875rem] border border-slate-700 bg-slate-800/60 p-4">
                      <div className="text-sm font-semibold text-white-100">
                        Deliverable
                      </div>
                      <p className="mt-2 text-sm leading-6 text-grey-300">
                        {service.deliverable}
                      </p>
                    </div>
                  ) : null}
                  {service.outcome ? (
                    <div className="rounded-[0.875rem] border border-slate-700 bg-slate-800/60 p-4">
                      <div className="text-sm font-semibold text-white-100">
                        Outcome
                      </div>
                      <p className="mt-2 text-sm leading-6 text-grey-300">
                        {service.outcome}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="rounded-[0.875rem] border border-dashed border-slate-700 bg-slate-800/30 p-4">
                  <div className="text-sm font-semibold text-white-100">
                    Detailed description & examples
                  </div>
                  <p className="mt-2 text-sm leading-6 text-grey-300">
                    Add use cases, sample deliverables, and relevant examples
                    for this service here.
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            actionHref="/contact"
            actionLabel="Start a Conversation"
            description="Approved service entries are not published yet. The page remains available so the corporate route is still useful."
            title="No approved services yet"
          />
        )}
      </Section>

      <Section>
        <Card className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
            Talk through the brief
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-white-100">
                Have a specific sporting or analytical challenge?
              </h2>
              <p className="text-base leading-7 text-grey-300">
                Describe the users, decision, data, and current workflow. We
                will help determine whether an existing product or a custom
                solution is the better fit.
              </p>
            </div>
            <Button href="/contact">Start a Conversation</Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
