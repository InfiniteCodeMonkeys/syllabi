import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../../trpc";
import createNodesAndEdges from "../../helpers/createNodesAndEdges";
import { Subjects } from "@prisma/client";
import { prisma } from "@acme/db";

export const subjectsRouter = router({
  get: publicProcedure.input(z.object({})).query(async () => {
    try {
      const subjects = await prisma?.subjects.findMany();

      const { nodeArray, edgeArray } = createNodesAndEdges(
        subjects as Subjects[],
      );

      return { nodeArray, edgeArray };
    } catch (error) {
      console.error(error);
      return error;
    }
  }),
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        syllabus: z.array(z.string()),
        children: z.array(z.string()),
        parents: z.array(z.string()),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await prisma?.subjects.create({
          data: {
            name: input.name,
            description: input.description,
            children: input.children,
          },
        });
      } catch (error) {
        console.error(error);
        return error;
      }
    }),
});
