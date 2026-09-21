import { PolicyPage, policyMetadata } from '@/components/content/policy-page';

export function generateMetadata() {
  return policyMetadata('accessibility');
}

export default function Page() {
  return <PolicyPage name="accessibility" />;
}
