module.exports = {
  '**/*': () => [
    'pnpm run check',
    'pnpm run format',
    'pnpm run lint',
    'pnpm run type-check',
    'pnpm run test'
  ],
};
