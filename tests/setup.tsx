import '@testing-library/jest-dom/vitest';
import { createElement } from 'react';
import { afterEach, vi } from 'vitest';
import type { ImgHTMLAttributes, ReactNode } from 'react';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string | { pathname: string };
    children: ReactNode;
  }) =>
    createElement(
      'a',
      {
        href: typeof href === 'string' ? href : href.pathname,
        ...rest,
      },
      children,
    ),
}));

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) =>
    createElement('img', { alt: props.alt ?? '', ...props }),
}));

afterEach(() => {
  document.documentElement.dataset.theme = 'light';
  document.documentElement.style.colorScheme = 'light';
  window.localStorage.clear();
});
