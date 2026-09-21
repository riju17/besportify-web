import type { BusinessDetails as Details } from '@/lib/business';

export function BusinessDetails({ details }: { details: Details }) {
  return (
    <div className="space-y-3 text-sm leading-7 text-grey-300">
      <p>
        {details.legalName
          ? `${details.brand} is operated by ${details.legalName}.`
          : details.brand}
      </p>
      {details.address ? (
        <address className="whitespace-pre-line not-italic">
          {details.address}
          {details.country ? `\n${details.country}` : ''}
        </address>
      ) : null}
      {details.registrationNumber ? (
        <p>Registration: {details.registrationNumber}</p>
      ) : null}
      {details.supportEmail ? (
        <p>
          Support:{' '}
          <a
            className="text-blue-500 underline"
            href={`mailto:${details.supportEmail}`}
          >
            {details.supportEmail}
          </a>
        </p>
      ) : null}
      {details.privacyEmail ? (
        <p>
          Privacy:{' '}
          <a
            className="text-blue-500 underline"
            href={`mailto:${details.privacyEmail}`}
          >
            {details.privacyEmail}
          </a>
        </p>
      ) : null}
      {details.phone ? <p>Phone: {details.phone}</p> : null}
      {details.grievanceContact ? (
        <p>Grievance contact: {details.grievanceContact}</p>
      ) : null}
      {!details.ready ? (
        <p>
          Complete business contact details are not available yet. Please check
          back before sending personal information or arranging a paid service.
        </p>
      ) : null}
    </div>
  );
}
