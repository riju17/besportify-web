import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Card } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric';
import { TestimonialCard } from '@/components/ui/testimonial';
import { MediaFrame } from '@/components/ui/media-frame';
import { Accordion } from '@/components/ui/accordion';
import { Tabs } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import {
  FieldShell,
  TextField,
  TextAreaField,
  SelectField,
  CheckboxField,
} from '@/components/ui/form';
import {
  LoadingState,
  EmptyState,
  ErrorState,
  DisabledState,
  LongContentState,
} from '@/components/ui/state';
import { Section } from '@/components/layout/section';

export function DesignSystemShowcase() {
  return (
    <div className="space-y-10 pb-20">
      <Section className="pt-10 sm:pt-14 lg:pt-16">
        <div className="max-w-3xl space-y-4">
          <Tag tone="green">Development showcase</Tag>
          <h1 className="text-4xl font-semibold tracking-tight text-white-100 sm:text-5xl lg:text-6xl">
            Design system and shell
          </h1>
          <p className="text-lg leading-8 text-grey-300">
            This page gathers the approved primitives, states, and responsive
            rules in one place for local review.
          </p>
        </div>
      </Section>

      <Section>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Tag>Default tag</Tag>
            <Tag tone="blue">Brand accent tag</Tag>
            <Tag tone="green">StatStrike tag</Tag>
            <Tag tone="subtle">Subtle tag</Tag>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Primary button</Button>
            <Button variant="secondary">Secondary button</Button>
            <Button variant="ghost">Ghost button</Button>
            <Button variant="danger">Danger button</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <ThemeToggle />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            value="12+"
            label="Tabbed states"
            note="Tabular numbers are used for metrics."
          />
          <TestimonialCard
            author="Approved placeholder"
            organisation="No public testimonial content"
            quote="Testimonial cards reserve space without inventing social proof."
            role="Development demo"
          />
          <MediaFrame
            caption="Optional media can be absent without breaking layout."
            title="Media frame"
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="space-y-4">
            <div className="text-lg font-semibold text-white-100">
              Accordion
            </div>
            <Accordion
              items={[
                {
                  title: 'Keyboard accessible',
                  content:
                    'Buttons expose the open state and close with Escape when the surrounding shell needs it.',
                },
                {
                  title: 'Reduced motion',
                  content:
                    'Transition classes are neutralised under prefers-reduced-motion so motion never becomes essential.',
                },
              ]}
            />
          </Card>
          <Card className="space-y-4">
            <div className="text-lg font-semibold text-white-100">Tabs</div>
            <Tabs
              items={[
                {
                  title: 'Overview',
                  content:
                    'A simple tab model supports overview, evidence, and variant review without a page reload.',
                },
                {
                  title: 'States',
                  content:
                    'Focus, disabled, empty, loading, and error states are shown together for quick review.',
                },
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="space-y-4">
            <div className="text-lg font-semibold text-white-100">
              Form primitives
            </div>
            <div className="grid gap-4">
              <FieldShell
                label="Project name"
                hint="Labels, help text, and errors remain programmatically connected."
              >
                <TextField placeholder="BeSportify" />
              </FieldShell>
              <FieldShell label="Project summary" error="Required">
                <TextAreaField placeholder="Short summary" />
              </FieldShell>
              <FieldShell label="Platform">
                <SelectField defaultValue="web">
                  <option value="web">Web</option>
                  <option value="studio">Studio</option>
                </SelectField>
              </FieldShell>
              <CheckboxField
                label="Enable preview"
                hint="This uses a descriptive label and a visible input state."
              />
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="text-lg font-semibold text-white-100">
              Content states
            </div>
            <div className="grid gap-4">
              <LoadingState
                description="Loading content state"
                title="Loading"
              />
              <EmptyState
                description="No items have been approved yet."
                title="Empty"
              />
              <ErrorState description="The CMS fetch failed." title="Error" />
              <DisabledState
                description="The control is not available in this phase."
                title="Disabled"
              />
              <LongContentState
                description="This block uses a wider measure and generous line-height so long headings and copied CMS content remain readable on small screens."
                title="A long heading that wraps without collapsing the layout or crowding adjacent content"
              />
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <Card className="space-y-4">
          <div className="text-lg font-semibold text-white-100">
            Portable Text
          </div>
          <p className="max-w-2xl text-sm leading-6 text-grey-300">
            Portable Text rendering is covered in the content layer tests and
            only approved block types are accepted. Unknown blocks are ignored
            safely instead of leaking experimental CMS content into the UI.
          </p>
        </Card>
      </Section>
    </div>
  );
}
