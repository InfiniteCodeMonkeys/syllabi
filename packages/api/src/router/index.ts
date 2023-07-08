import { router } from "../trpc";
import { algoliaRouter } from "./routes/algolia";
import { congressRouter } from "./routes/congress";
import { AIRouter } from "./routes/openai";
import { userRouter } from "./routes/user";

export const appRouter = router({
  user: userRouter,
  algolia: algoliaRouter,
  openai: AIRouter,
  congress: congressRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
