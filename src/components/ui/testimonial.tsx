import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';

type TestimonialProps = {
  quote: string;
  author: string;
  role?: string;
  organisation?: string;
};

export function TestimonialCard({
  quote,
  author,
  role,
  organisation,
}: TestimonialProps) {
  return (
    <Card className="flex h-full flex-col gap-5">
      <p className="text-lg leading-8 text-white-100">“{quote}”</p>
      <div className="mt-auto flex flex-col gap-3">
        <div className="text-sm font-semibold text-white-100">{author}</div>
        <div className="flex flex-wrap gap-2">
          {role ? <Tag tone="subtle">{role}</Tag> : null}
          {organisation ? <Tag tone="subtle">{organisation}</Tag> : null}
        </div>
      </div>
    </Card>
  );
}
