import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import client from "../../podcastApi";

export const episodeRouter = router({
  getMany: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const podcast = await client.fetchPodcastById({ id: input.id });

        const response = podcast.data;

        return { status: "success", data: response };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          message: error,
        };
      }
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const episode = await client.fetchEpisodeById({ id: input.id });

        const response = episode.data;

        return { status: "success", data: response };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          message: error,
        };
      }
    }),
});
