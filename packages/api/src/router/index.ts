import { router } from "../trpc";
import { algoliaRouter } from "./routes/algolia";
import { coursesRouter } from "./routes/courses";
import { subjectsRouter } from "./routes/subjects";
import { userRouter } from "./routes/user";

export const appRouter = router({
  user: userRouter,
  subjects: subjectsRouter,
  courses: coursesRouter,
  algolia: algoliaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
