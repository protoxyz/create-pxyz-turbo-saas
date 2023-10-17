import { OwnerType } from "@acme/db/types";
import { z } from "zod";

export const updateProjectSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
});

export const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  creatorId: z.string().cuid().nullable().optional(),
  ownerId: z.string().cuid(),
  ownerType: z.nativeEnum(OwnerType),
});
