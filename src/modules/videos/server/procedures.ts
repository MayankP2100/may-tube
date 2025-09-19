import { db } from '@/db';
import { videos } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    // When a video is created, we set a default title
    // The user can update the title later
    const [video] = await db
      .insert(videos)
      .values({
        userId,
        title: 'Untitled',
      })
      .returning();

    return {
      video: video,
    };
  }),
});
