import { z } from "zod";

export const paginationSchema = z.object({
  cursor: z.string().optional(),
  take: z.number().positive().optional(),
});
