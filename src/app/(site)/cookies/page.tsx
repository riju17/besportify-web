import { PolicyPage, policyMetadata } from '@/components/content/policy-page';

export function generateMetadata() {
  return policyMetadata('cookies');
}

export default function Page() {
  return <PolicyPage name="cookies" />;
}
