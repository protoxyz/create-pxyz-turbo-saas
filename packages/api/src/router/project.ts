import { OwnerType } from "@acme/db/types";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getProjectsForOwner } from "../lib/actions";
import { userIsAuthorizedForProject } from "../lib/authorizations";
import { createProjectSchema, updateProjectSchema } from "../schemas/project";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    // If we're signed in with an organization, return all projects for that org.
    if (ctx.user.claims?.orgId) {
      return await getProjectsForOwner(ctx.prisma, {
        ownerId: ctx.user.claims.orgId,
        ownerType: OwnerType.organization,
      });

      // If we're signed in with a user, return all projects for that user.
    } else {
      return await getProjectsForOwner(ctx.prisma, {
        ownerId: ctx.user.sub,
        ownerType: OwnerType.user,
      });
    }
  }),

  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
          creatorId: ctx.user.sub,
          ownerId: ctx.user.claims?.orgId || ctx.user.sub,
          ownerType: ctx.user.claims?.orgId
            ? OwnerType.organization
            : OwnerType.user,
        },
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      if (!(await userIsAuthorizedForProject(ctx.prisma, ctx.user, input.id))) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this project.",
        });
      }

      return await ctx.prisma.project.findUnique({
        where: { id: input.id },
      });
    }),

  update: protectedProcedure
    .input(updateProjectSchema)
    .mutation(async ({ ctx, input }) => {
      if (!(await userIsAuthorizedForProject(ctx.prisma, ctx.user, input.id))) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this project.",
        });
      }

      return await ctx.prisma.project.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      if (!(await userIsAuthorizedForProject(ctx.prisma, ctx.user, input.id))) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this project.",
        });
      }

      return await ctx.prisma.project.delete({
        where: { id: input.id },
      });
    }),
});
