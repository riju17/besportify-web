'use client';

import {
  startTransition,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  CheckboxField,
  FieldShell,
  TextAreaField,
  TextField,
} from '@/components/ui/form';

export function ContactEnquiryForm({
  supportEmail,
  businessReady = false,
}: {
  supportEmail?: string | null;
  businessReady?: boolean;
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    startTransition(() => setHydrated(true));
  }, []);
  const [consent, setConsent] = useState(false);
  const [draftUrl, setDraftUrl] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | undefined>();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const available = Boolean(businessReady && supportEmail);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!available || !consent || !form.reportValidity()) return;
    const fields = new FormData(form);
    const name = String(fields.get('name') || '')
      .trim()
      .slice(0, 100);
    const message = String(fields.get('message') || '')
      .trim()
      .slice(0, 1500);
    if (!message) {
      setMessageError('Enter a message with more than spaces.');
      (form.elements.namedItem('message') as HTMLTextAreaElement)?.focus();
      return;
    }
    const body = `${name ? `Name: ${name}\n\n` : ''}${message}\n\nI consent to BeSportify using the details I send to respond to this enquiry. Privacy notice version: 2026-09-13.`;
    const url = `mailto:${supportEmail}?subject=${encodeURIComponent('BeSportify enquiry')}&body=${encodeURIComponent(body)}`;
    setDraftUrl(url);
    // This explicit gesture opens an email app; entries never go to our web server.
    const anchor = linkRef.current;
    if (anchor) {
      anchor.href = url;
      anchor.click();
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}
      onChange={() => {
        setDraftUrl(null);
        setMessageError(undefined);
      }}
      aria-label="Contact enquiry"
      aria-describedby="enquiry-notice"
    >
      <p id="enquiry-notice" className="text-sm leading-7 text-grey-300">
        {available
          ? 'This form opens your email app. Review the draft and send it there; this website does not submit or store your message.'
          : 'Enquiries are currently unavailable while business contact details are being completed. Please do not enter personal information.'}
      </p>
      <fieldset disabled={!available || !hydrated} className="space-y-6">
        <legend className="sr-only">Your enquiry</legend>
        <FieldShell
          label="Your name (optional)"
          hint="Only if you would like us to address you by name."
        >
          <TextField autoComplete="name" name="name" maxLength={100} />
        </FieldShell>
        <FieldShell
          label="Message (required)"
          error={messageError}
          hint="Up to 1,500 characters. Do not include passwords, card details, health records, or personal details about children or other players."
        >
          <TextAreaField
            name="message"
            required
            minLength={1}
            maxLength={1500}
          />
        </FieldShell>
        <p className="text-sm leading-7 text-grey-300">
          Read the{' '}
          <Link className="text-blue-500 underline" href="/privacy">
            privacy policy
          </Link>{' '}
          before sharing information. Your email address will be shared when you
          send the email. Consent can be withdrawn using the privacy contact.
          This is not a marketing subscription.
        </p>
        <CheckboxField
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
          label="I consent to BeSportify using the details I send to respond to this enquiry."
          name="enquiryConsent"
        />
        <Button disabled={!available || !hydrated} type="submit">
          Open email draft
        </Button>
      </fieldset>
      <a
        ref={linkRef}
        href={draftUrl || undefined}
        hidden={!draftUrl}
        className="inline-block py-2 text-blue-500 underline"
      >
        Reopen email draft
      </a>
      <p role="status" className="text-sm leading-7 text-grey-300">
        {draftUrl
          ? `Your browser was asked to open an email draft. No enquiry has been sent by this website. If no email app opens, compose a message to ${supportEmail}.`
          : ''}
      </p>
      <noscript>
        <p className="text-sm leading-7 text-grey-300">
          The draft form needs JavaScript.{' '}
          {available
            ? `You can write directly to ${supportEmail}; read the privacy policy first.`
            : 'Please check back for contact details.'}
        </p>
      </noscript>
    </form>
  );
}
