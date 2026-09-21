import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';
import { Container } from './container';

type SectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
};

export function Section({
  children,
  className,
  innerClassName,
  id,
}: SectionProps) {
  return (
    <section className={cx('py-14 sm:py-16 lg:py-20', className)} id={id}>
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}
