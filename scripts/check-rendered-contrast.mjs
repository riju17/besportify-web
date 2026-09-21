import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

export async function checkRenderedContrast(browser, base) {
  const findings = [];
  const luminance = (rgb) =>
    rgb
      .map((c) => {
        const s = c / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      })
      .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
  for (const theme of ['light', 'dark']) {
    for (const width of [1280, 375]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        colorScheme: theme,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      for (const route of [
        '/',
        '/products',
        '/products/statstrike',
        '/services',
        '/about',
        '/team',
        '/careers',
        '/privacy',
        '/cookies',
        '/contact',
        '/terms',
        '/refunds',
        '/accessibility',
      ]) {
        await page.goto(`${base}${route}`);
        await page.waitForLoadState('networkidle');
        const text = await page.evaluate(() => {
          const canvas = document.createElement('canvas');
          canvas.width = canvas.height = 1;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
          );
          const result = [];
          while (walker.nextNode()) {
            const node = walker.currentNode,
              el = node.parentElement;
            if (
              !el ||
              !node.textContent.trim() ||
              el.closest(
                'script,style,noscript,[hidden],fieldset[disabled],button[disabled],.sr-only',
              )
            )
              continue;
            const style = getComputedStyle(el);
            if (style.visibility === 'hidden' || style.display === 'none')
              continue;
            const range = document.createRange();
            range.selectNodeContents(node);
            const rects = Array.from(range.getClientRects())
              .filter(
                (r) => r.width > 0 && r.height > 0 && r.left >= 0 && r.top >= 0,
              )
              .map((r) => ({ x: r.x, y: r.y, w: r.width, h: r.height }));
            ctx.clearRect(0, 0, 1, 1);
            ctx.fillStyle = style.color;
            ctx.fillRect(0, 0, 1, 1);
            const pixel = ctx.getImageData(0, 0, 1, 1).data;
            const color = [pixel[0], pixel[1], pixel[2], pixel[3] / 255];
            if (!color || !rects.length) continue;
            const fontSize = parseFloat(style.fontSize),
              weight = parseInt(style.fontWeight);
            result.push({
              text: node.textContent.trim().slice(0, 100),
              color,
              rects,
              threshold:
                fontSize >= 24 || (fontSize >= 18.66 && weight >= 700)
                  ? 3
                  : 4.5,
            });
          }
          return result;
        });
        await page.addStyleTag({
          content:
            '* { color: transparent !important; text-shadow: none !important; caret-color: transparent !important; }',
        });
        const { data, info } = await sharp(
          await page.screenshot({ fullPage: true }),
        )
          .removeAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });
        const failures = [];
        let minimum = 100;
        for (const t of text) {
          let min = 100;
          for (const r of t.rects)
            for (const dx of [0.1, 0.5, 0.9]) {
              const x = Math.min(
                info.width - 1,
                Math.max(0, Math.round(r.x + r.w * dx)),
              );
              const y = Math.min(
                info.height - 1,
                Math.max(0, Math.round(r.y + r.h * 0.5)),
              );
              const p = (y * info.width + x) * info.channels,
                bg = [data[p], data[p + 1], data[p + 2]];
              const a = t.color[3] ?? 1,
                fg = t.color.slice(0, 3).map((v, i) => v * a + bg[i] * (1 - a));
              const [l1, l2] = [luminance(fg), luminance(bg)].sort(
                (a, b) => b - a,
              );
              min = Math.min(min, (l1 + 0.05) / (l2 + 0.05));
            }
          minimum = Math.min(minimum, min);
          if (min < t.threshold)
            failures.push({
              text: t.text,
              ratio: Number(min.toFixed(2)),
              required: t.threshold,
            });
        }
        findings.push({
          route,
          theme,
          width,
          sampledTextNodes: text.length,
          minimum: Number(minimum.toFixed(2)),
          failures,
        });
        console.log(
          `Contrast samples ${theme} ${width} ${route}: ${failures.length} below threshold`,
        );
      }
      await context.close();
    }
  }
  await writeFile(
    'docs/audit-results/rendered-contrast.json',
    JSON.stringify(findings, null, 2),
  );
}
