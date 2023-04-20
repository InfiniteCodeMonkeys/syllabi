import { router } from "../trpc";
import { coursesRouter } from "./routes/courses";
import { subjectsRouter } from "./routes/subjects";
import { userRouter } from "./routes/user";

export const appRouter = router({
  user: userRouter,
  subjects: subjectsRouter,
  courses: coursesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
