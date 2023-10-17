import { prisma } from "@acme/db";
import { SessionUser } from "@protoxyz/types";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

interface CreateContextOptions {
  user: SessionUser | null;
}

const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  return {
    user: opts.user,
    prisma,
  };
};

export const createTRPCContext = async (opts: {
  req?: Request;
  user?: SessionUser | null;
}) => {
  console.log(">>> tRPC Request from " + opts.user?.claims?.name);

  return createInnerTRPCContext({
    user: opts.user ?? null,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
