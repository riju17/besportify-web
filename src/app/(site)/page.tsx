import type { Metadata } from 'next';
import { HomepageSlice } from '@/components/sections/homepage';
import { AnimatedBeSportify } from '@/components/sections/animated-besportify';
import { getSiteUrl } from '@/lib/env';
import { homepageDefaults } from '@/lib/homepage';
import { loadHomepageData } from '@/lib/homepage-data';

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadHomepageData();
  const home = data.homepage;
  const title =
    home?.seo?.title ?? home?.heroTitle ?? homepageDefaults.heroTitle;
  const description =
    home?.seo?.description ?? home?.heroBody ?? homepageDefaults.heroBody;

  return {
    title,
    description,
    alternates: {
      canonical: home?.seo?.canonical ?? '/',
    },
    robots: home?.seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: '/',
      type: 'website',
      siteName: data.siteSettings?.companyName ?? 'BeSportify',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function HomePage() {
  const data = await loadHomepageData();
  const siteUrl = getSiteUrl();
  const companyName = data.siteSettings?.companyName ?? 'BeSportify';
  const description =
    data.homepage?.seo?.description ??
    data.homepage?.heroBody ??
    data.siteSettings?.description ??
    homepageDefaults.heroBody;

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: companyName,
      url: siteUrl,
      description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: companyName,
      url: new URL('/', siteUrl).toString(),
      description,
    },
  ];
  const structuredDataJson = JSON.stringify(structuredData).replace(
    /</g,
    '\\u003c',
  );

  return (
    <div className="relative w-full bg-[#09080a] text-white selection:bg-red-600/30">
      <script
        dangerouslySetInnerHTML={{
          __html: structuredDataJson,
        }}
        type="application/ld+json"
      />
      <AnimatedBeSportify />
      <HomepageSlice data={data} hideHero={true} />
    </div>
  );
}
