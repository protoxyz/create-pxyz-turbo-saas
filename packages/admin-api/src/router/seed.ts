import { createTRPCRouter, protectedProcedure } from "../trpc";

export const seedRouter = createTRPCRouter({
  settings: protectedProcedure.query(async ({ ctx }) => {
    return {};
  }),
});
