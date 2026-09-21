import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';
import { getSiteUrl } from '@/lib/env';
import { getThemeBootstrapScript } from '@/components/theme/theme-bootstrap';
import { ThemeProvider } from '@/components/theme/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'BeSportify',
    template: '%s | BeSportify',
  },
  description: 'BeSportify corporate website foundation.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      className="bg-ink-950 text-white-100 antialiased"
      data-theme="light"
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: getThemeBootstrapScript() }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
