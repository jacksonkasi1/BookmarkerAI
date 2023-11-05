import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const metaRouter = createTRPCRouter({
  metaScrap: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(({ ctx, input }) => {
      console.log(ctx);
      return {
        url: input.url,
      };
    }),
});
