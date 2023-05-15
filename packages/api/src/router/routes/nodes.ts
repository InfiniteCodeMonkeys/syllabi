import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import { prisma } from "@acme/db";

import setPosition from "../../helpers/setPosition";

export const nodesRouter = router({
  get: publicProcedure.input(z.object({})).query(async () => {
    const nodes: any[] = [];
    try {
      const subjects = await prisma?.nodes.findMany();
      const edges = await prisma?.edges.findMany();

      subjects.forEach((subject, index) => {
        const { x, y } = setPosition(subject, index);
        nodes.push({ ...subject, position: { x, y } });
      });

      return { nodes, edges };
    } catch (error) {
      console.error(error);
      return error;
    }
  }),
  //   add: protectedProcedure
  //     .input(
  //       z.object({
  //         name: z.string(),
  //         description: z.string(),
  //         syllabus: z.array(z.string()),
  //         children: z.array(z.string()),
  //         parents: z.array(z.string()),
  //       }),
  //     )
  //     .mutation(async ({ input }) => {
  //       try {
  //         await prisma?.subjects.create({
  //           data: {
  //             name: input.name,
  //             description: input.description,
  //             children: input.children,
  //           },
  //         });
  //       } catch (error) {
  //         console.error(error);
  //         return error;
  //       }
  //     }),
});
