import { projectRouter } from "./router/projects";
import { seedRouter } from "./router/seed";
import { statsRouter } from "./router/stats";
import { createTRPCRouter } from "./trpc";

export const adminRouter = createTRPCRouter({
  project: projectRouter,
  seed: seedRouter,
  stats: statsRouter,
});

// export type definition of API
export type AdminRouter = typeof adminRouter;
