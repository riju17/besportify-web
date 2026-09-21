import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/corporate-pages', () => {
  return {
    corporateDefaults: {
      contactBody:
        'Tell us about your organisation, competition, current workflow, and the decision or problem you are trying to address.',
      contactTitle: 'Start a conversation',
    },
    loadContactPageData: vi.fn(async () => ({
      siteSettings: {
        companyName: 'BeSportify',
        contactEmail: 'hello@example.com',
        contactPhone: null,
        description: null,
        seo: null,
        socialLinks: null,
      },
    })),
  };
});

import ContactPage from '@/app/(site)/contact/page';

describe('ContactPage', () => {
  it('renders the disabled delivery state instead of a false success path', async () => {
    render(await ContactPage());

    expect(
      screen.getByRole('heading', { name: 'Start a conversation' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/enquiries are currently unavailable/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Open email draft' }),
    ).toBeDisabled();
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
  });
});
