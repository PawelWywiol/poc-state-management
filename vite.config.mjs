import path from 'node:path';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    !process.env.VITEST &&
      reactRouter({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
      }),
    tsconfigPaths(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, './setupTest.ts')],
    coverage: {
      provider: 'v8',
      include: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
    },
  },
});
