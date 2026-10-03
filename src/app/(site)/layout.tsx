import type { ReactNode } from 'react';
import { SiteShell } from '@/components/layout/site-shell';

// Site content reads draft mode and Sanity at request time. Mark the segment
// explicitly dynamic so production builds do not attempt to prerender CMS
// queries that depend on request cookies.
export const dynamic = 'force-dynamic';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
