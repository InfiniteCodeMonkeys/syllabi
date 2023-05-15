import { protectedProcedure, router } from "../../trpc";
import { prisma } from "@acme/db";
import fs from "fs";
import path from "path";
const nodesFile = "../../packages/data/nodes.json";
const edgesFile = "../../packages/data/edges.json";

const nodes = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), nodesFile), "utf8"),
);

const edges = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), edgesFile), "utf8"),
);

export const seedRouter = router({
  seed: protectedProcedure.mutation(async () => {
    // const userId = ctx.auth.userId;
    // const user = await prisma?.user.findUnique({
    //   where: {
    //     clerkId: userId,
    //   },
    // });
    console.log(nodes.length);
    for (const node in nodes) {
      try {
        await prisma?.nodes.create({
          data: {
            id: nodes[node].id,
            data: nodes[node].data,
            children: nodes[node].children || undefined,
            parent: nodes[node].parents,
            type: nodes[node].type,
          },
        });
      } catch (error) {
        console.error(error);
        return error;
      }
    }
    for (const edge in edges) {
      try {
        await prisma?.edges.create({
          data: {
            id: edges[edge].id,
            source: edges[edge].source,
            target: edges[edge].target,
          },
        });
      } catch (error) {
        console.error(error);
        return error;
      }
    }
  }),
});
