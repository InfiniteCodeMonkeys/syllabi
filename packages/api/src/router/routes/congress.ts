import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc";
import getBillTextURL from "../../helpers/getBillTextURL";

interface BillFromGetBills {
  congress: number;
  latestAction: {
    actionDate: string;
    text: string;
  };
  number: string;
  title: string;
  type: string;
  url: string;
  originChamber: string;
  originChamberCode: string;
  updateDate: string;
  updateDateIncludingText: string;
}

interface BillFromGetBill {
  actions: {
    count: number;
    url: string;
  };
  cboCostEstimates: [
    {
      description: string;
      pubDate: string;
      title: string;
      url: string;
    },
  ];
  comitteeReports: [
    {
      citation: string;
      url: string;
    },
  ];
  comittees: [
    {
      count: number;
      url: string;
    },
  ];
  congress: number;
  cosponsors: {
    count: number;
    url: string;
    countIncludingWithdrawnCosponsors: number;
  };
  introducedDate: string;
  latestAction: {
    actionDate: string;
    text: string;
  };
  number: string;
  originChamber: string;
  policyArea: {
    name: string;
  };
  relatedBills: {
    count: number;
    url: string;
  };
  sponsors: [
    {
      bioguideId: string;
      firstName: string;
      lastName: string;
      fullName: string;
      isByRequest: string;
      party: string;
      state: string;
      url: string;
    },
  ];
  subjects: {
    count: number;
    url: string;
  };
  summaries: {
    count: number;
    url: string;
  };
  textVersions: {
    count: number;
    url: string;
  };
  title: string;
  titles: [
    {
      count: number;
      url: string;
    },
  ];
  type: string;
  updateDate: string;
  updateDateIncludingText: string;
}

export const congressRouter = router({
  getBills: protectedProcedure
    .input(z.object({ congress: z.string() }))
    .query(async ({ input }) => {
      try {
        const response = await fetch(
          `https://api.congress.gov/v3/bill/${input.congress}?api_key=${process.env.CONGRESS_API_KEY}`,
          { method: "GET" },
        );

        const data = await response.json();
        console.log(data);
        const bills: BillFromGetBills[] = data.bills;

        return { result: bills };
      } catch (error: any) {
        console.error(error);
        return { message: error.message };
      }
    }),
  getBillFromURL: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const response = await fetch(
          `${input}&api_key=${process.env.CONGRESS_API_KEY}`,
          { method: "GET" },
        );

        const data = await response.json();
        const bill: BillFromGetBill = data.results[0];

        return { result: bill };
      } catch (error: any) {
        console.error(error);
        return { message: error.message };
      }
    }),
  getBill: protectedProcedure
    .input(
      z.object({
        congress: z.string(),
        billType: z.string(),
        billNumber: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const response = await fetch(
          `https://api.congress.gov/v3/bill/${input.congress}/${input.billType}/${input.billNumber}?api_key=${process.env.CONGRESS_API_KEY}`,
          { method: "GET" },
        );

        const data = await response.json();

        return { result: data };
      } catch (error: any) {
        console.error(error);
        return { message: error.message };
      }
    }),
  getBillTextURL: publicProcedure
    .input(
      z.object({
        congress: z.number(),
        billType: z.string(),
        billNumber: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const url = await getBillTextURL(
          input.congress,
          input.billType,
          input.billNumber,
        );

        return url;
      } catch (error: any) {
        console.error(error);
        return { message: error.message };
      }
    }),
});
