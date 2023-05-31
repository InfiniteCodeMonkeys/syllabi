import { router } from "../trpc";
import { algoliaRouter } from "./routes/algolia";
import { coursesRouter } from "./routes/courses";
import { nodesRouter } from "./routes/nodes";
import { seedRouter } from "./routes/seed";
import { userRouter } from "./routes/user";

export const appRouter = router({
  user: userRouter,
  // subjects: subjectsRouter,
  courses: coursesRouter,
  algolia: algoliaRouter,
  seed: seedRouter,
  nodes: nodesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
