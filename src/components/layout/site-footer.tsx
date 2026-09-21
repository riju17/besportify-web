import Link from 'next/link';
import { getBusinessDetails } from '@/lib/business';
import { BusinessDetails } from '@/components/content/business-details';
import { Container } from './container';
import { BeSportifyLogo } from '@/components/ui/logo';
import {
  footerCompanyItems,
  footerExploreItems,
  footerLegalItems,
} from '@/lib/routes';
import { InlineLink } from '@/components/ui/link';

export async function SiteFooter() {
  const details = await getBusinessDetails();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white-100/10 bg-ink-950/90 backdrop-blur-xl">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link
              className="inline-flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
              href="/"
            >
              <BeSportifyLogo />
            </Link>
            <p className="max-w-md text-sm leading-7 text-grey-300">
              BeSportify builds sports-technology products and analytical
              solutions, with cricket as its current focus.
            </p>
            <BusinessDetails details={details} />
          </div>

          <FooterColumn title="Company" items={footerCompanyItems} />
          <FooterColumn title="Explore" items={footerExploreItems} />
          <FooterLegal title="Legal" items={footerLegalItems} />
        </div>

        <div className="mt-10 border-t border-white-100/8 pt-6 text-sm text-grey-300">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} BeSportify. All rights reserved.</span>
            <span className="max-w-xl">Sports technology and analysis.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <nav aria-label={title} className="space-y-4">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
        {title}
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <InlineLink
              href={item.href}
              className="text-sm text-grey-300 hover:text-white-100"
            >
              {item.label}
            </InlineLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterLegal({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <nav aria-label={title} className="space-y-4">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-grey-300">
        {title}
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <InlineLink
              href={item.href}
              className="text-sm text-grey-300 hover:text-white-100"
            >
              {item.label}
            </InlineLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
