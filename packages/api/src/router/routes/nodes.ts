import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import setPosition from "../../helpers/setPosition";
import { prisma } from "@acme/db";
interface Subject {
  id: string;
  data: any;
  type: string;
  children: string[];
  details: any;
  parent: {
    id: string;
  };
}

export const nodesRouter = router({
  get: publicProcedure.input(z.object({})).query(async () => {
    const nodes: any[] = [];
    try {
      const subjects = (await prisma?.nodes.findMany()) as unknown as Subject[];
      const edges = await prisma?.edges.findMany();

      subjects.forEach((subject: Subject, index) => {
        const { x, y } = setPosition(subject, index);
        nodes.push({
          ...subject,
          position: { x, y },
          parentNode: subject?.parent?.id,
        });
      });

      return { nodes, edges };
    } catch (error) {
      console.error(error);
      return error;
    }
  }),
  suggest: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        tags: z.string(),
        parent: z.string(),
        resources: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await prisma?.suggestedNodes.create({
          data: {
            name: input.title,
            description: input.description,
            details: { tags: input.tags, resources: input.resources },
            parents: input.parent,
            children: [],
          },
        });
        return "Success";
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
