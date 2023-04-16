import { router } from "../trpc";
import { nodesRouter } from "./routes/nodes";
import { userRouter } from "./routes/user";

export const appRouter = router({
  user: userRouter,
  nodes: nodesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
