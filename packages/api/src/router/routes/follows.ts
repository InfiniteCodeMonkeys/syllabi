import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const followsRouter = router({
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.auth.userId;

    return prisma?.follows.findMany({ where: { userId: user } });
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.auth.session?.userId;

      return prisma?.follows.findFirst({
        where: { userId: user, podcastId: input.id },
      });
    }),
  search: protectedProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.auth.userId;

      return prisma?.follows.findMany({
        where: {
          userId: user,
          description: {
            contains: input.searchTerm,
          },
        },
      });
    }),
  addFavorite: protectedProcedure
    .input(z.object({ podcast: z.string(), interests: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("adding");
      const user = ctx.auth.userId;
      console.log(user);

      await prisma?.follows.create({
        data: {
          podcastId: input.podcast,
          interests: input.interests,
          userId: user,
        },
      });
      console.log("DONE");
    }),
  removeFavorite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      console.log("removing");

      await prisma?.follows.delete({ where: { id: input.id } });
    }),
});
