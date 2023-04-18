import { router } from "../trpc";
import { subjectsRouter } from "./routes/subjects";
import { userRouter } from "./routes/user";

export const appRouter = router({
  user: userRouter,
  subjects: subjectsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
