import { PolicyPage, policyMetadata } from '@/components/content/policy-page';

export function generateMetadata() {
  return policyMetadata('terms');
}

export default function Page() {
  return <PolicyPage name="terms" />;
}
