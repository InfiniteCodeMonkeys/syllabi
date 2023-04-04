import { router } from "../trpc";
import { authRouter } from "./auth";
import { podRouter } from "./routes/podcasts";
import { episodeRouter } from "./routes/episodes";
import { queueRouter } from "./routes/queue";
import { userRouter } from "./routes/user";
import { followsRouter } from "./routes/follows";

export const appRouter = router({
  auth: authRouter,
  podcasts: podRouter,
  episodes: episodeRouter,
  queue: queueRouter,
  user: userRouter,
  follows: followsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
