import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { Accordion } from '@/components/ui/accordion';
import { Tabs } from '@/components/ui/tabs';

describe('Accordion', () => {
  it('toggles panel visibility', async () => {
    const user = userEvent.setup();
    render(
      createElement(Accordion, {
        items: [
          { title: 'One', content: 'First panel' },
          { title: 'Two', content: 'Second panel' },
        ],
      }),
    );

    expect(screen.getByRole('region', { name: 'One' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: /two/i }));
    expect(screen.getByRole('region', { name: 'Two' })).toBeVisible();
  });
});

describe('Tabs', () => {
  it('switches panels', async () => {
    const user = userEvent.setup();
    render(
      createElement(Tabs, {
        items: [
          { title: 'Overview', content: 'Overview panel' },
          { title: 'Evidence', content: 'Evidence panel' },
        ],
      }),
    );

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview panel');
    await user.click(screen.getByRole('tab', { name: 'Evidence' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Evidence panel');
  });
});
