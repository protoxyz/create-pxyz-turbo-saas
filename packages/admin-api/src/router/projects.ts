import { Project } from "@acme/db/types";
import { TRPCError } from "@trpc/server";

import { paginate } from "../lib/pagination";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../lib/schemas/projects";
import { getByIdSchema, paginationSchema } from "../lib/schemas/shared";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const projectRouter = createTRPCRouter({
  all: adminProcedure.input(paginationSchema).query(async ({ input, ctx }) => {
    const { prisma } = ctx;
    const { take } = input;

    return await paginate<Project>({
      model: prisma.project,
      take,
      cursor: input.cursor,
    });
  }),

  byId: adminProcedure.input(getByIdSchema).query(async ({ input, ctx }) => {
    const { prisma } = ctx;
    const { id } = input;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    return project;
  }),

  create: adminProcedure
    .input(createProjectSchema)
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx;

      const project = await prisma.project.create({
        data: {
          ...input,
        },
      });

      return project;
    }),

  update: adminProcedure
    .input(updateProjectSchema)
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx;

      const project = await prisma.project.findUnique({
        where: { id: input.id },
      });

      if (!project) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project doesn't exist.",
        });
      }

      const updatedProject = prisma.project.update({
        where: { id: project.id },
        data: {
          ...input,
        },
      });

      return updatedProject;
    }),

  delete: adminProcedure
    .input(getByIdSchema)
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { id } = input;

      const project = await prisma.project.delete({
        where: { id },
      });

      return project;
    }),
});
