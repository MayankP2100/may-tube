import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import { ClientGreeting } from './client-greeting';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Home() {
  prefetch(trpc.hello.queryOptions({ text: '' }));

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientGreeting />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
