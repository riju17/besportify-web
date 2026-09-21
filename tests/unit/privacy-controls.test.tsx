import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemePreferences } from '@/components/theme/theme-preferences';
import { Accordion } from '@/components/ui/accordion';
import { Tabs } from '@/components/ui/tabs';
import { hasImageRights, isSafeHref } from '@/lib/content-safety';

it('saves a theme only after opt-in and removes it on withdrawal', async () => {
  const user = userEvent.setup();
  render(
    <ThemeProvider>
      <ThemePreferences />
    </ThemeProvider>,
  );
  expect(window.localStorage.length).toBe(0);
  await user.click(screen.getByRole('switch'));
  expect(window.localStorage.length).toBe(0);
  await user.click(screen.getByRole('checkbox', { name: 'Remember my theme' }));
  expect(window.localStorage.getItem('besportify-theme')).toBe('dark');
  await user.click(screen.getByRole('button', { name: 'Clear saved theme' }));
  expect(window.localStorage.getItem('besportify-theme')).toBeNull();
  await user.click(screen.getByRole('switch'));
  expect(window.localStorage.length).toBe(0);
});

it('restores an existing preference without overwriting it on mount', () => {
  window.localStorage.setItem('besportify-theme', 'dark');
  document.documentElement.dataset.theme = 'dark';
  render(
    <ThemeProvider>
      <ThemePreferences />
    </ThemeProvider>,
  );
  expect(window.localStorage.getItem('besportify-theme')).toBe('dark');
  expect(screen.getByRole('checkbox')).toBeChecked();
});

it('supports arrow, Home and End keys with a single tab stop', async () => {
  const user = userEvent.setup();
  render(
    <Tabs
      items={[
        { title: 'One', content: 'First' },
        { title: 'Two', content: 'Second' },
        { title: 'Three', content: 'Third' },
      ]}
    />,
  );
  await user.tab();
  await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Second');
  await user.keyboard('{End}');
  expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();
  await user.keyboard('{Home}');
  expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
  expect(
    screen.getAllByRole('tab').filter((tab) => tab.tabIndex === 0),
  ).toHaveLength(1);
});

it('removes closed accordion content from the accessibility tree and keeps IDs unique', () => {
  const items = [
    { title: 'One', content: 'First' },
    { title: 'Two', content: 'Second' },
  ];
  const { container } = render(
    <>
      <Accordion items={items} />
      <Accordion items={items} />
    </>,
  );
  expect(screen.queryByRole('region', { name: 'Two' })).not.toBeInTheDocument();
  const ids = Array.from(container.querySelectorAll('[id]')).map(
    (element) => element.id,
  );
  expect(new Set(ids).size).toBe(ids.length);
});

describe('content protection', () => {
  it('withholds images unless alt text and usage rights evidence are complete', () => {
    expect(
      hasImageRights({
        alt: 'Cricket team',
        source: 'Owner',
        permission: 'Signed licence',
      }),
    ).toBe(false);
    expect(
      hasImageRights({
        alt: ' ',
        source: 'Owner',
        permission: 'Licence',
        rightsConfirmed: true,
      }),
    ).toBe(false);
    expect(
      hasImageRights({
        alt: 'Cricket team',
        source: 'Owner',
        permission: 'Signed licence',
        rightsConfirmed: true,
      }),
    ).toBe(true);
  });
  it.each([
    'javascript:alert(1)',
    '//tracker.example',
    'data:text/html,test',
    '/\\evil.example',
    'https://user:password@example.com',
  ])('rejects unsafe URL %s', (href) => expect(isSafeHref(href)).toBe(false));
});
