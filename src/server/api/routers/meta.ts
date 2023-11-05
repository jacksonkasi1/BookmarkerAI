import graph from 'open-graph-scraper'

import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

// ** import types
import { urlInput } from "@/types/validation";
import { MetaOutput } from "@/types";

export const metaRouter = createTRPCRouter({
  metaScrape: protectedProcedure
    .input(urlInput)
    .mutation( async ({  input }) => {
      const { url } = input;

      const {result} = await graph({url})

      return {
        url,
        result: result as MetaOutput
      };
    }),
});
