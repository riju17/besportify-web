import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudiesPageContent } from '@/components/sections/case-studies-page';
import { loadCaseStudiesPageData } from '@/lib/editorial';

const defaultTitle = 'Case Studies | BeSportify';
const defaultDescription =
  'See how BeSportify applies sports technology and analytics to real performance, preparation, tournament, and commercial questions.';

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadCaseStudiesPageData();
  const noContent = data.caseStudies.length === 0;

  return {
    title: {
      absolute: defaultTitle,
    },
    description: defaultDescription,
    alternates: {
      canonical: '/case-studies',
    },
    robots:
      noContent || data.siteSettings?.seo?.noIndex
        ? { index: false, follow: false }
        : undefined,
  };
}

export default async function CaseStudiesPage() {
  const data = await loadCaseStudiesPageData();

  if (process.env.NODE_ENV === 'production' && !data.caseStudies.length) {
    notFound();
  }

  return <CaseStudiesPageContent data={data} />;
}
