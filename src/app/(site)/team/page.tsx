import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/state';
import { InlineLink } from '@/components/ui/link';
import { Section } from '@/components/layout/section';
import { Tag } from '@/components/ui/tag';
import { JsonLd } from '@/components/content/json-ld';
import {
  corporateDefaults,
  loadTeamPageData,
  resolveCorporateLink,
} from '@/lib/corporate-pages';
import { getSiteUrl } from '@/lib/env';
import { urlFor } from '@/sanity/lib/image';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'Team | BeSportify',
    },
    description:
      "Meet the people building BeSportify's sports-technology products and analytical solutions.",
    alternates: {
      canonical: '/team',
    },
  };
}

export default async function TeamPage() {
  const data = await loadTeamPageData();
  const team = data.team?.length
    ? data.team
    : (corporateDefaults.teamCatalog ?? []);

  return (
    <div className="space-y-10 pb-20">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Team | BeSportify',
          description: corporateDefaults.teamBody,
          url: `${getSiteUrl()}/team`,
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
                name: 'Team',
                item: `${getSiteUrl()}/team`,
              },
            ],
          },
        }}
      />

      <Section className="pt-10 sm:pt-14 lg:pt-16">
        <div className="max-w-3xl space-y-4">
          <Tag tone="blue">Team</Tag>
          <h1 className="text-4xl font-semibold tracking-tight text-white-100 sm:text-5xl lg:text-6xl">
            {corporateDefaults.teamTitle}
          </h1>
          <p className="text-lg leading-8 text-grey-300">
            {corporateDefaults.teamBody}
          </p>
        </div>
      </Section>

      <Section>
        {team.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member, index) => {
              const profile = resolveCorporateLink(member.profileLink);
              const photoSrc = member.photo?.asset
                ? (urlFor(member.photo)?.width(900).quality(85).url() ?? null)
                : null;
              const isFounder = index === 0 && member.role === 'Founder';

              return (
                <Card
                  className={`space-y-4 ${isFounder ? 'md:col-span-2 md:grid md:grid-cols-[16rem_1fr] md:gap-x-6 xl:col-span-3' : ''}`}
                  key={member._id ?? member.name ?? 'team-member'}
                >
                  <div
                    className={`overflow-hidden rounded-[1rem] border border-slate-700 bg-slate-800/60 ${isFounder ? 'md:row-span-2' : ''}`}
                  >
                    <div className="relative aspect-square w-full bg-gradient-to-br from-slate-900 via-slate-800 to-ink-950">
                      {photoSrc ? (
                        <Image
                          alt={
                            member.photo?.alt ?? member.name ?? 'Team member'
                          }
                          className="object-cover"
                          fill
                          sizes="(min-width: 1280px) 24rem, (min-width: 768px) 36vw, 100vw"
                          src={photoSrc}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center p-6 text-center">
                          <div className="max-w-xs">
                            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-500">
                              Approved photo missing
                            </div>
                            <p className="mt-3 text-sm leading-6 text-grey-300">
                              This card preserves layout until a consented
                              portrait is supplied.
                            </p>
                          </div>
                          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 shadow-[0_0_16px_rgba(237,28,36,0.15)]">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {photoSrc && member.photo?.credit ? (
                    <p className="text-sm leading-6 text-grey-300">
                      Image credit: {member.photo.credit}
                    </p>
                  ) : null}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight text-white-100">
                        {member.name ?? 'Team member'}
                      </h2>
                      {member.role ? (
                        <Tag tone="subtle">{member.role}</Tag>
                      ) : null}
                    </div>
                    {member.bio ? (
                      <p className="text-sm leading-6 text-grey-300">
                        {member.bio}
                      </p>
                    ) : null}
                    {profile ? (
                      <InlineLink
                        href={profile.href}
                        external={profile.external}
                      >
                        {profile.label || 'Professional profile'}
                      </InlineLink>
                    ) : null}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <EmptyState
            actionHref="/contact"
            actionLabel="Contact Us"
            description="Approved team profiles are not published yet. The page remains available so the corporate route is still useful."
            title="No approved team profiles yet"
          />
        )}
      </Section>

      <Section>
        <Card className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
            Profile requirements
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white-100">
                Public profiles need approval and consent
              </h2>
              <p className="text-base leading-7 text-grey-300">
                The public team page only shows approved profiles with consent
                and an accurate current role. That keeps the page honest when
                people are advising, consulting, or contributing on a limited
                basis.
              </p>
            </div>
            <ul className="space-y-2 text-sm leading-6 text-grey-300">
              <li>Approved full name</li>
              <li>Current role</li>
              <li>60-100 word professional bio</li>
              <li>Areas of responsibility or expertise</li>
              <li>Approved photograph</li>
              <li>LinkedIn or professional profile</li>
              <li>Publication consent</li>
            </ul>
          </div>
        </Card>
      </Section>

      <Section>
        <Card className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
            Start a conversation
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-white-100">
                Need to discuss a collaboration or a specific problem?
              </h2>
              <p className="text-base leading-7 text-grey-300">
                Use the contact path if you want to scope a product, service, or
                advisory conversation with BeSportify.
              </p>
            </div>
            <Button href="/contact">Contact</Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
