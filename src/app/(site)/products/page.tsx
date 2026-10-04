import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InlineLink } from '@/components/ui/link';
import { MediaFrame } from '@/components/ui/media-frame';
import { Section } from '@/components/layout/section';
import { Tag } from '@/components/ui/tag';
import { JsonLd } from '@/components/content/json-ld';
import { corporateDefaults, loadProductsPageData } from '@/lib/corporate-pages';
import { getSiteUrl } from '@/lib/env';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'Products | BeSportify',
    },
    description:
      'Explore sports-technology products from BeSportify, including StatStrike, our cricket-intelligence platform.',
    alternates: {
      canonical: '/products',
    },
  };
}

export default async function ProductsPage() {
  const data = await loadProductsPageData();
  const siteUrl = getSiteUrl();
  const productName = data.product?.name?.trim() || 'StatStrike';
  const summary =
    data.product?.summary?.trim() || corporateDefaults.productBody;
  const productImageTitle =
    data.product?.heroMedia?.caption?.trim() || `${productName} preview`;
  const productImageCaption =
    data.product?.heroMedia?.credit?.trim() ||
    'Approved media is shown only when a real asset exists.';
  const productUrl = `${siteUrl}/products/statstrike`;
  const productsUrl = `${siteUrl}/products`;

  return (
    <div className="space-y-10 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Products | BeSportify',
          description: corporateDefaults.productBody,
          url: productsUrl,
          mainEntity: {
            '@type': 'Product',
            name: productName,
            description: summary,
            url: productUrl,
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${siteUrl}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Products',
                item: productsUrl,
              },
            ],
          },
        }}
      />

      <Section className="pt-10 sm:pt-14 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <Tag tone="blue">Products</Tag>
            <div className="max-w-3xl space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white-100 sm:text-5xl lg:text-6xl">
                {corporateDefaults.productTitle}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-grey-300">
                {summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact">Request a Demo</Button>
              <Button href="/products/statstrike" variant="secondary">
                Explore StatStrike
              </Button>
            </div>
          </div>

          <MediaFrame
            caption={productImageCaption}
            credit={data.product?.heroMedia?.credit}
            src={data.productImageSrc ?? undefined}
            title={productImageTitle}
          />
        </div>
      </Section>

      <Section>
        <div className="space-y-6">
          <div className="max-w-2xl space-y-3">
            <Tag tone="green">Our product portfolio</Tag>
            <h2 className="text-3xl font-semibold tracking-tight text-white-100 sm:text-4xl">
              One flagship product. More ideas taking shape.
            </h2>
            <p className="text-base leading-7 text-grey-300">
              StatStrike is the product we are actively bringing to sporting
              organisations today. Dashanalysis and Whydatawhy are part of the
              wider BeSportify product direction and will be introduced as their
              positioning and product details are ready.
            </p>
          </div>

          <Card className="overflow-hidden border-green-400/30 bg-gradient-to-br from-green-400/10 via-slate-800/75 to-slate-800/50 p-0">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5 p-6 sm:p-8">
                <Tag tone="green" pulse>
                  Flagship product
                </Tag>
                <div className="space-y-3">
                  <h3 className="text-3xl font-semibold tracking-tight text-white-100 sm:text-4xl">
                    {productName}
                  </h3>
                  <p className="max-w-2xl text-lg leading-8 text-grey-300">
                    {summary}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    [
                      'Performance analysis',
                      'Evaluate players and teams with structured evidence.',
                    ],
                    [
                      'Opposition preparation',
                      'Turn relevant patterns into focused match preparation.',
                    ],
                    [
                      'Scouting and comparison',
                      'Support selection conversations with role-aware comparisons.',
                    ],
                    [
                      'Match review',
                      'Review matches clearly and agree practical next steps.',
                    ],
                  ].map(([title, body]) => (
                    <div
                      key={title}
                      className="rounded-[0.875rem] border border-green-400/20 bg-slate-800/60 p-4"
                    >
                      <div className="text-sm font-semibold text-white-100">
                        {title}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-grey-300">
                        {body}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button href="/products/statstrike">
                    Explore StatStrike
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Request a Demo
                  </Button>
                </div>
              </div>
              <div className="relative flex min-h-64 items-end overflow-hidden border-t border-green-400/20 bg-[radial-gradient(circle_at_70%_20%,rgba(47,157,88,0.3),transparent_45%),linear-gradient(145deg,rgba(6,11,19,0.15),rgba(6,11,19,0.8))] p-6 lg:min-h-full lg:border-l lg:border-t-0 lg:p-8">
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="statstrike-logo-motion relative h-36 w-36 rounded-full shadow-[0_0_48px_rgba(82,218,205,0.22)] transition-transform duration-500 hover:scale-110 sm:h-44 sm:w-44">
                    <Image
                      alt="StatStrike logo"
                      className="h-full w-full rounded-full object-cover mix-blend-multiply"
                      fill
                      sizes="(min-width: 640px) 11rem, 9rem"
                      src="/statstrike-logo-marble.png"
                    />
                  </div>
                </div>
                <div className="relative z-10 space-y-2">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-green-400">
                    Built for cricket decisions
                  </div>
                  <p className="text-sm leading-6 text-grey-300">
                    From player evaluation and scouting to opposition analysis
                    and match review.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="space-y-3" tone="bordered">
              <Tag tone="subtle">In development</Tag>
              <h3 className="text-2xl font-semibold text-white-100">
                Dashanalysis
              </h3>
              <p className="leading-7 text-grey-300">
                A developing BeSportify product concept. Details will be shared
                here once the product direction and availability are ready.
              </p>
            </Card>
            <Card className="space-y-3" tone="bordered">
              <Tag tone="subtle">In development</Tag>
              <h3 className="text-2xl font-semibold text-white-100">
                Whydatawhy
              </h3>
              <p className="leading-7 text-grey-300">
                A developing BeSportify product concept exploring how data can
                lead to clearer questions, context, and decisions.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-4" tone="bordered">
            <div className="space-y-3">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
                Product philosophy
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-white-100 sm:text-3xl">
                {corporateDefaults.productPhilosophyTitle}
              </h2>
              <p className="text-base leading-7 text-grey-300">
                {corporateDefaults.productPhilosophyBody}
              </p>
            </div>
          </Card>

          <Card className="space-y-4" tone="bordered">
            <div className="rounded-[0.875rem] border border-blue-500/25 bg-blue-500/8 p-4 text-sm leading-6 text-grey-300">
              StatStrike is our current flagship product. Speak with us if you
              want to understand how it could fit your team’s workflow.
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact">Request a Demo</Button>
              <Button href="/products/statstrike" variant="secondary">
                Explore StatStrike
              </Button>
            </div>
            <p className="text-sm leading-6 text-grey-300">
              {data.product?.cta?.supportingCopy?.trim() ? (
                <>
                  {data.product.cta.supportingCopy.trim()}{' '}
                  {data.product?.cta?.link ? (
                    <InlineLink href="/products/statstrike" className="text-sm">
                      View the product route
                    </InlineLink>
                  ) : null}
                </>
              ) : (
                'Approved product proof is not shown until a real asset, testimonial, or verified metric exists.'
              )}
            </p>
          </Card>
        </div>
      </Section>

      <Section>
        <Card className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
            Next step
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-white-100">
                Have a decision problem in mind?
              </h2>
              <p className="text-base leading-7 text-grey-300">
                Tell us what the user needs to decide, what data exists, and
                where the workflow is breaking down.
              </p>
            </div>
            <Button href="/contact">Start a Conversation</Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
