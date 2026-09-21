import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/utils';

type InlineLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'className' | 'children'
>;

export function InlineLink({
  href,
  children,
  className,
  external,
  ...rest
}: InlineLinkProps) {
  const classes = cx(
    'font-medium text-blue-500 underline decoration-blue-500/40 underline-offset-4 transition hover:decoration-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 motion-reduce:transition-none',
    className,
  );

  if (external) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} {...rest}>
      {children}
    </Link>
  );
}
