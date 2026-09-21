import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { BusinessDetails } from './business-details';
import { ThemePreferences } from '@/components/theme/theme-preferences';
import { getBusinessDetails } from '@/lib/business';
import { policies, policyReviewDate, type PolicyName } from '@/lib/policies';

export async function policyMetadata(name: PolicyName): Promise<Metadata> {
  const details = await getBusinessDetails();
  return {
    title: policies[name].title,
    description: policies[name].introduction,
    alternates: { canonical: `/${name}` },
    robots: details.ready ? undefined : { index: false, follow: true },
  };
}

export async function PolicyPage({ name }: { name: PolicyName }) {
  const policy = policies[name];
  const details = await getBusinessDetails();
  return (
    <Section className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white-100 sm:text-5xl">
            {policy.title}
          </h1>
          <p className="text-sm text-grey-300">
            Last updated:{' '}
            <time dateTime={policyReviewDate}>13 September 2026</time>
          </p>
          <p className="text-lg leading-8 text-grey-300">
            {policy.introduction}
          </p>
        </header>
        <nav
          aria-label="On this page"
          className="rounded-xl border border-slate-700 p-5"
        >
          <ul className="space-y-2">
            {policy.sections.map((section, i) => (
              <li key={section.title}>
                <a
                  className="inline-block py-1 text-blue-500 underline underline-offset-4"
                  href={`#section-${i + 1}`}
                >
                  {section.title}
                </a>
              </li>
            ))}
            <li>
              <a
                className="inline-block py-1 text-blue-500 underline underline-offset-4"
                href="#business-details"
              >
                Business and contact details
              </a>
            </li>
          </ul>
        </nav>
        {policy.sections.map((section, i) => (
          <section
            key={section.title}
            id={`section-${i + 1}`}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-white-100">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p className="text-base leading-8 text-grey-300" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        {name === 'cookies' ? <ThemePreferences /> : null}
        {name === 'terms' ? (
          <p className="text-sm leading-7 text-grey-300">
            Font licence notices:{' '}
            <a className="text-blue-500 underline" href="/licenses/inter.txt">
              Inter
            </a>{' '}
            and{' '}
            <a
              className="text-blue-500 underline"
              href="/licenses/space-grotesk.txt"
            >
              Space Grotesk
            </a>
            .
          </p>
        ) : null}
        <section
          id="business-details"
          className="space-y-4 border-t border-slate-700 pt-6"
        >
          <h2 className="text-2xl font-semibold text-white-100">
            Business and contact details
          </h2>
          <BusinessDetails details={details} />
        </section>
        <nav
          aria-label="Related policies"
          className="flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-700 pt-6"
        >
          {Object.entries(policies)
            .filter(([key]) => key !== name)
            .map(([key, value]) => (
              <Link
                className="py-1 text-blue-500 underline"
                href={`/${key}`}
                key={key}
              >
                {value.title}
              </Link>
            ))}
        </nav>
      </article>
    </Section>
  );
}
