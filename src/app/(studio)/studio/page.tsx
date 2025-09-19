import { DEFAULT_LIMIT } from '@/constants';
import StudioView from '@/modules/studio/ui/view/studio-view';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import React from 'react';

function page() {
  prefetch(
    trpc.studio.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
    }),
  );
  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
}

export default page;
