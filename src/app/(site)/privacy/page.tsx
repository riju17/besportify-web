import { PolicyPage, policyMetadata } from '@/components/content/policy-page';

export function generateMetadata() {
  return policyMetadata('privacy');
}

export default function Page() {
  return <PolicyPage name="privacy" />;
}
