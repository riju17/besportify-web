import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyPageContent } from '@/components/sections/case-studies-page';
import { loadCaseStudyPageData } from '@/lib/editorial';

type RouteParams = Promise<{ slug: string }>;

const defaultTitle = 'Case Study | BeSportify';
const defaultDescription =
  'Read how BeSportify structures sports intelligence around a real client problem, approved evidence, and a clearly stated outcome.';

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadCaseStudyPageData(slug);
  const caseStudy = data.caseStudy;
  const seo = caseStudy?.seo;
  const noContent = !caseStudy;

  return {
    title: {
      absolute: seo?.title?.trim() || caseStudy?.title?.trim() || defaultTitle,
    },
    description:
      seo?.description?.trim() ||
      caseStudy?.challenge?.trim() ||
      caseStudy?.outcome?.trim() ||
      defaultDescription,
    alternates: {
      canonical: seo?.canonical?.trim() || `/case-studies/${slug}`,
    },
    robots:
      noContent || seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;
  const data = await loadCaseStudyPageData(slug);

  if (process.env.NODE_ENV === 'production' && !data.caseStudy) {
    notFound();
  }

  return <CaseStudyPageContent data={data} />;
}
