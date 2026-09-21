import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { SiteHeader } from '@/components/layout/site-header';

describe('SiteHeader', () => {
  it('opens and closes the mobile navigation with keyboard support', async () => {
    const user = userEvent.setup();
    render(createElement(ThemeProvider, null, createElement(SiteHeader)));

    const toggle = screen.getByRole('button', {
      name: /open navigation menu/i,
    });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('navigation', { name: /mobile primary/i }),
    ).toBeVisible();

    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });
});
