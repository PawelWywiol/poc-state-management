import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const GC_TIME = 86_400_000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: GC_TIME,
    },
  },
});

export const ClientProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
