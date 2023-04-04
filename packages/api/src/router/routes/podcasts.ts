import { z } from "zod";
import client from "../../podcastApi";
import { publicProcedure, router } from "../../trpc";
import trending from "../../data/trending.json";
import culture from "../../data/culture.json";
import news from "../../data/news.json";
import business from "../../data/business.json";
import detailed from "../../data/detailed.json";

export const podRouter = router({
  getMany: publicProcedure
    .input(
      z
        .object({
          page: z.number().optional().default(0),
          genreId: z.string().nullish(),
        })
        .nullish(),
    )
    .query(async ({ input }) => {
      console.log(input);
      if (process.env.NEXT_PUBLIC_API_MOCKING != "enabled") {
        try {
          const search = await client.fetchBestPodcasts({
            genre_id: input?.genreId || null, // when you don't supply anything it just gives you the best podcasts
            page: input?.page,
            region: "us",
            sort: "listen_score",
            safe_mode: 0,
          });
          console.log("search", search);
          const response = search.data.podcasts;

          return { status: "success", data: response };
        } catch (error) {
          console.error(error);
          return {
            statusCode: 500,
            message: error,
          };
        }
      } else {
        if (!input?.genreId) {
          return { status: "success", data: trending };
        }
        if (input?.genreId === "140") {
          return { status: "success", data: trending };
        }
        if (input?.genreId === "99") {
          return { status: "success", data: news };
        }
        if (input?.genreId === "122") {
          return { status: "success", data: culture };
        }
        if (input?.genreId === "93") {
          return { status: "success", data: business };
        }
      }
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      if (process.env.NEXT_PUBLIC_API_MOCKING != "enabled") {
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
      } else {
        return { status: "success", data: detailed };
      }
    }),
  search: publicProcedure
    .input(
      z.object({
        searchTerm: z.string().nullish(),
        offset: z.number().optional().default(0),
        genreId: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      console.log(input);
      try {
        const search = await client.search({
          q: input.searchTerm || "politics",
          offset: input.offset,
          genreId: input.genreId || null,
          onlyIn: "title, description",
          region: "us",
          type: "podcast",
        });
        console.log(search.data);
        const response = search.data.results;

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
