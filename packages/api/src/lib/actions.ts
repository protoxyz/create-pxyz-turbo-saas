import { OwnerType, PrismaClient } from "@acme/db/types";

export function getProjectsForOwner(
  prisma: PrismaClient,
  { ownerId, ownerType }: { ownerId: string; ownerType: OwnerType },
) {
  return prisma.project.findMany({
    where: {
      ownerId,
      ownerType,
    },
    orderBy: { createdAt: "desc" },
  });
}
