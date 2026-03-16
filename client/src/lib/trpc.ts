import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppRouter = any;

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      transformer: superjson,
      fetch(url, options) {
        return globalThis.fetch(url, {
          ...(options ?? {}),
          credentials: 'include',
        });
      },
    }),
  ],
});
