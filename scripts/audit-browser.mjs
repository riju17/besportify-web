import { readFile, writeFile } from 'node:fs/promises';
import { checkRenderedContrast } from './check-rendered-contrast.mjs';
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ||
    '/private/tmp/besportify-audit-tools/node_modules/playwright/index.mjs'
);

const base = 'http://127.0.0.1:3100';
const routes = [
  '/',
  '/products',
  '/products/statstrike',
  '/services',
  '/about',
  '/team',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/refunds',
  '/accessibility',
  '/case-studies',
  '/insights',
];
const axeSource = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : { channel: 'chrome' }),
});
const results = [];
try {
  if (process.env.CONTRAST_ONLY === '1') {
    await checkRenderedContrast(browser, base);
  } else {
    for (const theme of ['light', 'dark']) {
      for (const width of [1280, 375]) {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          colorScheme: theme,
          reducedMotion: 'reduce',
        });
        const page = await context.newPage();
        const externalRequests = new Set();
        const errors = [];
        page.on('request', (req) => {
          if (new URL(req.url()).origin !== base)
            externalRequests.add(new URL(req.url()).origin);
        });
        page.on('pageerror', (error) => errors.push(error.message));
        for (const route of routes) {
          const response = await page.goto(`${base}${route}`);
          await page.waitForLoadState('networkidle');
          await page.addScriptTag({ content: axeSource });
          const audit = await page.evaluate(async () => {
            const axe = await window.axe.run(document, {
              runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'],
              },
            });
            return {
              theme: document.documentElement.dataset.theme,
              overflow: document.documentElement.scrollWidth > innerWidth,
              storage: Object.keys(localStorage),
              violations: axe.violations.map((v) => ({
                id: v.id,
                impact: v.impact,
                nodes: v.nodes.map((n) => ({
                  target: n.target,
                  summary: n.failureSummary,
                })),
              })),
              incomplete: axe.incomplete.map((v) => v.id),
            };
          });
          results.push({
            route,
            requestedTheme: theme,
            width,
            status: response.status(),
            ...audit,
          });
          console.log(
            `${theme} ${width} ${route}: ${audit.violations.length} accessibility violations, overflow=${audit.overflow}, storage=${audit.storage.length}`,
          );
          if (route === '/cookies' && width === 375)
            await page.screenshot({
              path: `docs/audit-results/cookies-${theme}-mobile.png`,
              fullPage: true,
            });
        }
        results.push({
          theme,
          width,
          externalRequests: [...externalRequests],
          errors,
          cookies: (await context.cookies()).map(({ name, domain }) => ({
            name,
            domain,
          })),
        });
        await context.close();
      }
    }
    const context = await browser.newContext({
      viewport: { width: 375, height: 800 },
    });
    const page = await context.newPage();
    await page.goto(`${base}/cookies`);
    await page.waitForLoadState('networkidle');
    await page.keyboard.press('Tab');
    const skipFocused = await page
      .getByRole('link', { name: 'Skip to content' })
      .evaluate((el) => document.activeElement === el);
    await page.keyboard.press('Enter');
    const skipWorks = await page
      .locator('main')
      .evaluate((el) => document.activeElement === el);
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await page.keyboard.press('Escape');
    const escapeRestoresFocus = await page
      .getByRole('button', { name: 'Open navigation menu' })
      .evaluate((el) => document.activeElement === el);
    await page.getByRole('checkbox', { name: 'Remember my theme' }).check();
    const savedTheme = await page.evaluate(() =>
      localStorage.getItem('besportify-theme'),
    );
    await page.reload();
    await page.waitForLoadState('networkidle');
    const restored = await page
      .getByRole('checkbox', { name: 'Remember my theme' })
      .isChecked();
    await page.getByRole('button', { name: 'Clear saved theme' }).click();
    const cleared = await page.evaluate(() => localStorage.length === 0);
    await page.setViewportSize({ width: 320, height: 800 });
    const narrowOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    results.push({
      interactionChecks: {
        skipFocused,
        skipWorks,
        escapeRestoresFocus,
        savedTheme,
        restored,
        cleared,
        narrowOverflow,
      },
    });
    await context.close();
    await checkRenderedContrast(browser, base);
  }
} finally {
  if (results.length)
    await writeFile(
      'docs/audit-results/browser-audit.json',
      JSON.stringify(results, null, 2),
    );
  await browser.close();
}
