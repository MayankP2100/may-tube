'use client';

import ResponsiveModal from '@/components/responsive-modal';
import StudioUploader from '@/components/studio-uploader';
import { Button } from '@/components/ui/button';
import { DEFAULT_LIMIT } from '@/constants';
import { cn } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

function StudioUploadModal() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createVideo = useMutation(
    trpc.videos.create.mutationOptions({
      onSuccess: () => {
        toast.success('Video created successfully');

        // Invalidate the studio videos query to refetch the list
        queryClient.invalidateQueries(
          trpc.studio.getMany.infiniteQueryOptions(
            {
              limit: DEFAULT_LIMIT,
            },
            {
              getNextPageParam: (lastPage) => lastPage.nextCursor,
            },
          ),
        );
      },
      onError: (error) => {
        toast.error(`Error creating video: ${error.message}`);
      },
    }),
  );

  return (
    <>
      <ResponsiveModal
        title='Upload a video'
        open={!!createVideo.data?.url}
        onOpenChange={() => {
          createVideo.reset();
        }}
      >
        {createVideo.data?.url ? (
          <StudioUploader
            endpoint={createVideo.data.url}
            onSuccess={() => {}}
          />
        ) : (
          <Loader2Icon />
        )}
      </ResponsiveModal>
      <Button
        onClick={() => createVideo.mutate()}
        disabled={createVideo.isPending}
      >
        <PlusIcon className={cn(createVideo.isPending && 'animate-spin')} />
        Create
      </Button>
    </>
  );
}

export default StudioUploadModal;
