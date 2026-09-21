import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightsPageContent } from '@/components/sections/insights-page';
import { loadInsightsPageData } from '@/lib/editorial';

const defaultTitle = 'Insights | BeSportify';
const defaultDescription =
  'Read BeSportify perspectives on cricket analytics, player evaluation, match preparation, sports technology, and data quality.';

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadInsightsPageData();
  const noContent = data.insights.length < 3;

  return {
    title: {
      absolute: defaultTitle,
    },
    description: defaultDescription,
    alternates: {
      canonical: '/insights',
    },
    robots:
      noContent || data.siteSettings?.seo?.noIndex
        ? { index: false, follow: false }
        : undefined,
  };
}

export default async function InsightsPage() {
  const data = await loadInsightsPageData();

  if (process.env.NODE_ENV === 'production' && data.insights.length < 3) {
    notFound();
  }

  return <InsightsPageContent data={data} />;
}
