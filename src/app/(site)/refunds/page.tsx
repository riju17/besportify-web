import { PolicyPage, policyMetadata } from '@/components/content/policy-page';

export function generateMetadata() {
  return policyMetadata('refunds');
}

export default function Page() {
  return <PolicyPage name="refunds" />;
}
