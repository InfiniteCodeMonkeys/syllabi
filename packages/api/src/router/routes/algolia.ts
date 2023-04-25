import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const algoliaRouter = router({
  search: publicProcedure.input(z.string()).query(async ({ input }) => {
    const API_KEY = process.env.ALGOLIA_API_KEY as string;
    const APPLICATION_ID = process.env.ALGOLIA_APPLICATION_ID as string;
    const index = process.env.ALGOLIA_INDEX;
    const url = `https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/${index}/query`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          "X-Algolia-API-Key": API_KEY,
          "X-Algolia-Application-Id": APPLICATION_ID,
        }),
        body: JSON.stringify({ params: `query=${input}&hitsPerPage=1` }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }),
});
