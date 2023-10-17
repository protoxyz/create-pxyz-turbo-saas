import { userRouter } from "./router/me";
import { projectRouter } from "./router/project";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  me: userRouter,
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
