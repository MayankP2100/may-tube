import HomeView from '@/modules/home/ui/views/home-view';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

// This page must be dynamic to support SSR with tRPC
// See https://trpc.io/docs/ssr
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;
  prefetch(trpc.categories.getMany.queryOptions());

  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
};

export default Page;
