import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";
import qstash from "../../qstash";
import { Queue } from "../../qstash/types/queue";

export const queueRouter = router({
  add: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        qstash({ type: Queue.AddToSubscribed, id: input.id });
      } catch (error) {
        console.error(error);
        return error;
      }
    }),
});
