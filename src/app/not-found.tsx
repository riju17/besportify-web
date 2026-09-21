import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center gap-6 py-20">
      <div className="space-y-4">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-500">
          404
        </div>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white-100 sm:text-5xl">
          The requested page is not available.
        </h1>
        <p className="max-w-xl text-lg leading-8 text-grey-300">
          The route may not exist yet, or it may be reserved for a later phase
          of the website.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button href="/">Go home</Button>
        <Button href="/products" variant="secondary">
          View products
        </Button>
      </div>
      <p className="text-sm text-grey-300">
        You can also return to the{' '}
        <Link className="text-blue-500 underline" href="/dev/design-system">
          design-system showcase
        </Link>{' '}
        while development is active.
      </p>
    </Container>
  );
}
