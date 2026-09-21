import { cache } from 'react';
import { z } from 'zod';
import {
  loadContactPageData,
  type CorporateSiteSettings,
} from './corporate-pages';

export function resolveBusinessDetails(settings: CorporateSiteSettings) {
  const email = (value?: string | null) => {
    const parsed = z.email().safeParse(value?.trim());
    return parsed.success ? parsed.data : null;
  };
  const legalName =
    process.env.BUSINESS_LEGAL_NAME?.trim() ||
    settings?.legalName?.trim() ||
    null;
  const address =
    process.env.BUSINESS_ADDRESS?.trim() ||
    settings?.businessAddress?.trim() ||
    null;
  const country =
    process.env.BUSINESS_COUNTRY?.trim() ||
    settings?.businessCountry?.trim() ||
    null;
  const supportEmail = email(
    process.env.BUSINESS_SUPPORT_EMAIL || settings?.contactEmail,
  );
  const privacyEmail =
    email(process.env.BUSINESS_PRIVACY_EMAIL || settings?.privacyEmail) ||
    supportEmail;

  return {
    brand: 'BeSportify',
    legalName,
    address,
    country,
    supportEmail,
    privacyEmail,
    phone: settings?.contactPhone?.trim() || null,
    registrationNumber:
      process.env.BUSINESS_REGISTRATION_NUMBER?.trim() ||
      settings?.registrationNumber?.trim() ||
      null,
    grievanceContact:
      process.env.BUSINESS_GRIEVANCE_CONTACT?.trim() ||
      settings?.grievanceContact?.trim() ||
      null,
    ready: Boolean(
      legalName && address && country && supportEmail && privacyEmail,
    ),
  };
}

export type BusinessDetails = ReturnType<typeof resolveBusinessDetails>;

export const getBusinessDetails = cache(async () => {
  const { siteSettings } = await loadContactPageData();
  return resolveBusinessDetails(siteSettings);
});
