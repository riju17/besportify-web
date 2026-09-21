import type { Metadata } from 'next';
import { loadStatStrikePageData, statstrikeDefaults } from '@/lib/statstrike';
import { AnimatedStatStrike } from '@/components/sections/animatedstatstrike';
import { StatStrikeTimeline } from '@/components/sections/statstrike-timeline';
import { StatStrikePageContent } from '@/components/sections/statstrike-page';

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadStatStrikePageData();
  const title =
    data.product?.seo?.title?.trim() ||
    'StatStrike Cricket Intelligence Platform | BeSportify';
  const description =
    data.product?.seo?.description?.trim() || statstrikeDefaults.body;
  const noIndex = Boolean(
    data.product?.seo?.noIndex || data.siteSettings?.seo?.noIndex,
  );

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: '/products/statstrike',
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function StatStrikePage() {
  const data = await loadStatStrikePageData();

  return (
    <div className="relative w-full transition-colors duration-300">
      {/* 1. Kinetic Exploded-View Scrollytelling Canvas (400vh) */}
      <AnimatedStatStrike />

      {/* 2. Working Software Preface UI Timeline (Steps 01 - 08) */}
      <StatStrikeTimeline />

      {/* 3. Deep-Dive Capabilities, Problem/Solution, Workflow, Metrics & FAQ */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StatStrikePageContent data={data} hideHero={true} />
      </div>
    </div>
  );
}
