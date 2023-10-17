import { z } from "zod";

import { paginationSchema } from "./shared";

export const listProjectsSchema = paginationSchema;

export const projectOutputSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
});

export const updateProjectSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
});
