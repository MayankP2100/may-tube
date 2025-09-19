import { db } from '@/db';
import { videos } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { and, desc, eq, lt, or } from 'drizzle-orm';
import { z } from 'zod';

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const { id: userId } = ctx.user;

      const data = await db
        .select()
        .from(videos)
        .where(
          and(
            eq(videos.userId, userId),
            // If there is a cursor, we want to fetch videos older than the cursor
            // We use the combination of updatedAt and id to have a consistent order
            // when multiple videos have the same updatedAt
            cursor
              ? or(
                  lt(videos.updatedAt, cursor.updatedAt),
                  and(
                    eq(videos.updatedAt, cursor.updatedAt),
                    lt(videos.id, cursor.id),
                  ),
                )
              : undefined,
          ),
        )
        // Sort by updatedAt desc, id desc to have a consistent order
        .orderBy(desc(videos.updatedAt), desc(videos.id))
        // Add 1 to the limit to determine if there is a next page
        .limit(limit + 1);

      // Determine if there is a next page
      const hasMore = data.length > limit;

      // If there is a next page, remove the last item
      // This is the item that would be shown as the "next" page
      const items = hasMore ? data.slice(0, -1) : data;

      // Set the next cursor to the last item if there is more data
      // This will be used by the client to determine if there is a next page
      const lastItem = items[items.length - 1];
      const nextCursor = hasMore
        ? {
            id: lastItem.id,
            updatedAt: lastItem.updatedAt,
          }
        : null;

      return {
        items,
        nextCursor,
      };
    }),
});
