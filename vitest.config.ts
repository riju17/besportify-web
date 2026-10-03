import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.tsx'],
    globals: true,
    testTimeout: 15_000,
  },
  resolve: {
    alias: {
      '@': path.resolve(root, './src'),
    },
  },
});
