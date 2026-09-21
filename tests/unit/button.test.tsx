import { render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders primary and secondary variants', () => {
    const primaryProps = {} as Parameters<typeof Button>[0];
    const secondaryProps = { variant: 'secondary' } as Parameters<
      typeof Button
    >[0];

    render(
      createElement(
        'div',
        null,
        createElement(Button, primaryProps, 'Primary'),
        createElement(Button, secondaryProps, 'Secondary'),
      ),
    );

    expect(screen.getByRole('button', { name: 'Primary' })).toHaveClass(
      'bg-blue-500',
    );
    expect(screen.getByRole('button', { name: 'Secondary' })).toHaveClass(
      'border-slate-700',
    );
  });

  it('renders as a link when href is supplied', () => {
    const linkProps = { href: '/contact' } as Parameters<typeof Button>[0];

    render(createElement(Button, linkProps, 'Request a Demo'));

    expect(
      screen.getByRole('link', { name: 'Request a Demo' }),
    ).toHaveAttribute('href', '/contact');
  });
});
