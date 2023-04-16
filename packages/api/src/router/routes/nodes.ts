import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../../trpc";
import { Node, Edge } from "reactflow";

export const nodesRouter = router({
  get: publicProcedure.input(z.object({})).query(async () => {
    try {
      const nodes = await prisma?.nodes.findMany();

      const nodeArray: Node[] = [];
      const edgeArray: Edge[] = [];

      nodes?.forEach((node, index) => {
        nodeArray.push({
          id: node.id,
          type: node.type,
          data: {
            label: node.name,
            description: node.description,
            syllabus: node.syllabus,
          },
          position: { x: (index + 2) * 100, y: (index + 2) * 100 },
          parentNode: node.parents[0],
        });

        if (node.parents[0] === "clggtsotk0004p0eqk2lfm793") {
          edgeArray.push({
            id: `${node.parents[0]}-${node.id}`,
            source: node.parents[0],
            target: node.id,
          });
        }

        node.children?.forEach((child) => {
          edgeArray.push({
            id: `${node.id}-${child}`,
            source: node.id,
            target: child,
          });
        });
      });
      console.log(nodeArray);
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
        await prisma?.nodes.create({
          data: {
            name: input.name,
            description: input.description,
            syllabus: input.syllabus,
            children: input.children,
            parents: input.parents,
          },
        });
      } catch (error) {
        console.error(error);
        return error;
      }
    }),
});
