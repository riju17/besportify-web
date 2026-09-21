import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactEnquiryForm } from '@/components/sections/contact-enquiry-form';

afterEach(() => vi.restoreAllMocks());

describe('ContactEnquiryForm', () => {
  it('does not accept data until business details are available', () => {
    render(<ContactEnquiryForm supportEmail="hello@example.com" />);
    expect(screen.getByRole('textbox', { name: /message/i })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Open email draft' }),
    ).toBeDisabled();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    fireEvent.submit(screen.getByRole('form'));
    expect(
      screen.queryByRole('link', { name: 'Reopen email draft' }),
    ).not.toBeInTheDocument();
  });

  it('disables native submission in server HTML so no-JavaScript visits cannot send form data in a URL', () => {
    const html = renderToString(
      <ContactEnquiryForm supportEmail="hello@example.com" businessReady />,
    );
    expect(html).toMatch(/<fieldset[^>]*disabled/);
  });

  it('requires explicit consent, collects only two text fields, and opens a correctly encoded email draft', async () => {
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const fetch = vi.spyOn(globalThis, 'fetch');
    const user = userEvent.setup();
    render(
      <ContactEnquiryForm supportEmail="hello@example.com" businessReady />,
    );
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(
      screen.getByRole('textbox', { name: /your name/i }),
    ).not.toBeRequired();
    const message = screen.getByRole('textbox', { name: /message/i });
    expect(message).toHaveAccessibleDescription(/do not include passwords/i);
    await user.tab();
    expect(screen.getByRole('textbox', { name: /your name/i })).toHaveFocus();
    await user.tab();
    expect(message).toHaveFocus();
    await user.type(message, 'Demo & planning? #cricket');
    fireEvent.submit(screen.getByRole('form'));
    expect(click).not.toHaveBeenCalled();
    await user.tab(); // privacy link
    await user.tab(); // consent
    expect(screen.getByRole('checkbox')).toHaveFocus();
    await user.keyboard(' ');
    await user.tab();
    await user.keyboard('{Enter}');
    expect(click).toHaveBeenCalledOnce();
    const draft = new URL(
      screen
        .getByRole('link', { name: 'Reopen email draft' })
        .getAttribute('href')!,
    );
    expect(draft.protocol).toBe('mailto:');
    expect(draft.pathname).toBe('hello@example.com');
    expect(draft.searchParams.get('body')).toContain(
      'Demo & planning? #cricket',
    );
    expect(draft.searchParams.get('body')).toContain('I consent');
    expect(screen.getByRole('status')).toHaveTextContent(
      'No enquiry has been sent',
    );
    expect(fetch).not.toHaveBeenCalled();
    expect(window.localStorage.length).toBe(0);
    await user.click(screen.getByRole('checkbox'));
    expect(
      screen.queryByRole('link', { name: 'Reopen email draft' }),
    ).not.toBeInTheDocument();
    fireEvent.submit(screen.getByRole('form'));
    expect(click).toHaveBeenCalledOnce();
  });
});

it('explains and focuses a whitespace-only message instead of silently failing', async () => {
  const user = userEvent.setup();
  render(<ContactEnquiryForm supportEmail="hello@example.com" businessReady />);
  await user.type(screen.getByRole('textbox', { name: /message/i }), '   ');
  await user.click(screen.getByRole('checkbox'));
  await user.click(screen.getByRole('button', { name: 'Open email draft' }));
  const message = screen.getByRole('textbox', { name: /message/i });
  expect(message).toHaveFocus();
  expect(message).toHaveAttribute('aria-invalid', 'true');
  expect(message).toHaveAccessibleDescription(
    /enter a message with more than spaces/i,
  );
});
