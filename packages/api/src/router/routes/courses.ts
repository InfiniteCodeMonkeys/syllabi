import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import { prisma } from "@acme/db";

export const coursesRouter = router({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const course = await prisma?.courses.findFirst({
          where: { id: input.id },
        });

        return course;
      } catch (error) {
        console.error(error);
        return error;
      }
    }),
});
