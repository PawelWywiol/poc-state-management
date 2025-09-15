# State Management in React - Proof of Concept

## Project Overview

This is a React state management proof-of-concept application built with React Router v7. It demonstrates five different state management approaches through identical shopping cart implementations:

- **Context API** (`/` route) - React's built-in state management
- **Zustand** (`/zustand` route) - Lightweight state management
- **Redux Toolkit** (`/redux` route) - Traditional Redux with modern toolkit
- **MobX** (`/mobx` route) - Observable state management (uses observer pattern, not React context)
- **Akita** (`/akita` route) - RxJS-based state management (uses service pattern, not React context)

## Development Commands

```bash
# Development server
npm run dev                # Start dev server at http://localhost:3000

# Testing
npm test                   # Run all tests with Vitest
npm run test:cov          # Run tests with coverage report

# Code Quality
npm run lint              # Check code with BiomeJS
npm run format            # Format code with BiomeJS
npm run check             # Lint and format (auto-fix)
npm run type-check        # TypeScript type checking

# Build
npm run build             # Build for production
npm start                 # Start production server

# Releases
npm run commit            # Commitizen for conventional commits
npm run release           # Create new release (patch)
npm run release:minor     # Create minor release
npm run release:major     # Create major release
```

## Architecture

### State Management Patterns

Each state management solution follows a consistent interface defined in `app/store/store.types.ts`:

```typescript
interface CartContextType {
  items: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
}
```

**Important Implementation Notes:**
- **MobX**: Uses direct store access with `observer` HOC, NOT React context
- **Akita**: Uses direct service access with subscription pattern, NOT React context
- **Context API, Zustand, Redux**: Use React context/providers as expected

### File Structure

```
app/
├── components/
│   ├── poc/                 # State management demo components
│   │   ├── poc-context-api.tsx
│   │   ├── poc-zustand.tsx
│   │   ├── poc-redux.tsx
│   │   ├── poc-mobx.tsx     # Uses observer pattern
│   │   └── poc-akita.tsx    # Uses service pattern
│   ├── products.tsx         # Shared product list component
│   ├── summary.tsx          # Shared cart summary component
│   └── ui/                  # Reusable UI components
├── store/
│   ├── [implementation]/    # Each state management approach
│   │   ├── cart.store.ts    # Store implementation
│   │   ├── cart.provider.tsx # Provider/hooks
│   │   └── cart.hooks.tsx   # Custom hooks (if needed)
│   ├── store.types.ts       # Shared interfaces
│   └── store.utils.ts       # Shared cart utilities
├── routes/                  # React Router v7 file-based routing
├── services/                # API services (TanStack Query)
└── lib/                     # Utilities and storage helpers
```

### Testing Strategy

- **Framework**: Vitest with jsdom environment
- **Location**: Tests in `__test__/` directory
- **Coverage**: Includes all `src/**/*.{ts,tsx}` except UI components
- **Setup**: Uses `vitest.setup.ts` for global test configuration

### Code Quality Tools

- **Linting/Formatting**: BiomeJS (replaces ESLint + Prettier)
- **Git Hooks**: Husky + lint-staged for pre-commit checks
- **Commits**: Conventional commits with Commitizen
- **Releases**: Standard-version for automated changelog generation

### Key Technologies

- **React Router v7**: File-based routing, SSR-ready
- **TanStack Query**: Server state management for API calls
- **TailwindCSS v4**: Utility-first styling
- **TypeScript**: Strict mode enabled
- **Vite**: Build tool and dev server

## Important Development Notes

1. **Path Aliases**: Use `@/*` for imports from the `app/` directory
2. **Node Version**: Requires Node.js 20.x (see `.volta` and `engines` in package.json)
3. **State Management Testing**: All implementations must pass the same test suite to ensure behavioral consistency
4. **MobX/Akita Pattern**: These implementations deliberately avoid React context in favor of their native patterns
5. **Conventional Commits**: Use `npm run commit` for properly formatted commit messages

## License

This project is licensed under the MIT License.
