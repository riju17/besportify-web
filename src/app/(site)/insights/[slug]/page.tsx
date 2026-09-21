import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightPageContent } from '@/components/sections/insights-page';
import { loadInsightPageData } from '@/lib/editorial';

type RouteParams = Promise<{ slug: string }>;

const defaultTitle = 'Insight | BeSportify';
const defaultDescription =
  'Read an approved BeSportify insight on cricket analytics, player evaluation, match preparation, sports technology, or data quality.';

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadInsightPageData(slug);
  const insight = data.insight;
  const seo = insight?.seo;
  const noContent = !insight;

  return {
    title: {
      absolute: seo?.title?.trim() || insight?.title?.trim() || defaultTitle,
    },
    description:
      seo?.description?.trim() ||
      insight?.excerpt?.trim() ||
      defaultDescription,
    alternates: {
      canonical: seo?.canonical?.trim() || `/insights/${slug}`,
    },
    robots:
      noContent || seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function InsightPage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const data = await loadInsightPageData(slug);

  if (process.env.NODE_ENV === 'production' && !data.insight) {
    notFound();
  }

  return <InsightPageContent data={data} />;
}
