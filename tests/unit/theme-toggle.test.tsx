import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createElement } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
    window.localStorage.clear();
  });

  it('switches themes without saving an unrequested preference', async () => {
    const user = userEvent.setup();

    render(
      createElement(ThemeProvider, null, createElement(ThemeToggle, null)),
    );

    const toggle = screen.getByRole('switch', {
      name: /switch to dark theme/i,
    });

    expect(toggle).toHaveAttribute('aria-checked', 'false');

    await user.click(toggle);

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(window.localStorage.getItem('besportify-theme')).toBeNull();
    expect(
      screen.getByRole('switch', { name: /switch to light theme/i }),
    ).toHaveAttribute('aria-checked', 'true');
  });
});
