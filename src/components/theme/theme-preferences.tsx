'use client';

import { useThemeMode } from './theme-provider';
import { ThemeToggle } from './theme-toggle';
import { CheckboxField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export function ThemePreferences() {
  const { rememberTheme, setRememberTheme, storageError } = useThemeMode();
  return (
    <section
      id="preferences"
      className="space-y-4 rounded-xl border border-slate-700 p-6"
      aria-labelledby="preferences-heading"
    >
      <h2
        id="preferences-heading"
        className="text-2xl font-semibold text-white-100"
      >
        Appearance and storage settings
      </h2>
      <ThemeToggle />
      <CheckboxField
        label="Remember my theme"
        hint="Optional. Save only light or dark on this browser until you clear it. This does not enable analytics or advertising."
        checked={rememberTheme}
        onChange={(event) => setRememberTheme(event.target.checked)}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() => setRememberTheme(false)}
      >
        Clear saved theme
      </Button>
      <p role="status" className="text-sm leading-6 text-grey-300">
        {storageError ||
          (rememberTheme
            ? 'Your theme is saved in this browser.'
            : 'Your theme is not saved by this site.')}
      </p>
    </section>
  );
}
