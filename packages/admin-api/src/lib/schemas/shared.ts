import { z } from "zod";

export const paginationSchema = z.object({
  take: z.number().int().min(1).max(100).default(20),
  cursor: z.number().int().optional(),
});

export const getByIdSchema = z.object({
  id: z.string().cuid(),
});
