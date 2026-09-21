import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BusinessDetails } from '@/components/content/business-details';
import { resolveBusinessDetails } from '@/lib/business';
import { Section } from '@/components/layout/section';
import { Tag } from '@/components/ui/tag';
import { JsonLd } from '@/components/content/json-ld';
import { ContactEnquiryForm } from '@/components/sections/contact-enquiry-form';
import { corporateDefaults, loadContactPageData } from '@/lib/corporate-pages';
import { getSiteUrl } from '@/lib/env';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'Contact BeSportify | Demos and Partnerships',
    },
    description:
      'Request a StatStrike demo or speak with BeSportify about sports analytics, technology, tournament, and partnership requirements.',
    alternates: {
      canonical: '/contact',
    },
  };
}

export default async function ContactPage() {
  const data = await loadContactPageData();
  const details = resolveBusinessDetails(data.siteSettings);
  const supportEmail = details.supportEmail;
  const supportPhone = details.phone;

  return (
    <div className="space-y-10 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact BeSportify',
          description: corporateDefaults.contactBody,
          url: `${getSiteUrl()}/contact`,
          mainEntity: {
            '@type': 'Organization',
            name: data.siteSettings?.companyName?.trim() || 'BeSportify',
            url: `${getSiteUrl()}/`,
            email: supportEmail || undefined,
            telephone: supportPhone || undefined,
          },
        }}
      />

      <Section className="pt-10 sm:pt-14 lg:pt-16">
        <div className="max-w-3xl space-y-4">
          <Tag tone="blue">Contact</Tag>
          <h1 className="text-4xl font-semibold tracking-tight text-white-100 sm:text-5xl lg:text-6xl">
            {corporateDefaults.contactTitle}
          </h1>
          <p className="text-lg leading-8 text-grey-300">
            {corporateDefaults.contactBody}
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-5">
            <ContactEnquiryForm
              supportEmail={supportEmail}
              businessReady={details.ready}
            />
          </Card>

          <div className="space-y-5">
            <Card className="space-y-4">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
                Enquiry options
              </div>
              <ul className="space-y-2 text-sm leading-6 text-grey-300">
                <li>StatStrike demo</li>
                <li>Team or league partnership</li>
                <li>Analytics or technology service</li>
                <li>Academy or player requirement</li>
                <li>Brand or sponsorship enquiry</li>
                <li>Media</li>
                <li>Careers</li>
                <li>Other</li>
              </ul>
            </Card>

            <Card className="space-y-4">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
                Contact details
              </div>
              <BusinessDetails details={details} />
            </Card>

            <Card className="space-y-4">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
                What happens next
              </div>
              <p className="text-sm leading-6 text-grey-300">
                Review your email draft and send it from your email app. Opening
                a draft does not send an enquiry, place an order, or book a
                demo.
              </p>
              <Button href="/products/statstrike" variant="secondary">
                Explore StatStrike
              </Button>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
