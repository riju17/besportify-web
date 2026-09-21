import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/layout/container';

export default function StudioPage() {
  return (
    <main className="py-16 sm:py-20">
      <Container>
        <Card className="mx-auto max-w-3xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-500">
            Sanity Studio
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white-100 sm:text-4xl">
              Studio shell available in development
            </h1>
            <p className="max-w-2xl text-base leading-7 text-grey-300">
              The full Studio bundle is intentionally excluded from the web app
              build in this environment. The schema, structure, and preview
              configuration remain in the repository for local CMS work.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/" variant="secondary">
              Return home
            </Button>
            <Button href="/dev/design-system">Review design system</Button>
          </div>
        </Card>
      </Container>
    </main>
  );
}
