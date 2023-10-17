import { OwnerType, PrismaClient } from "@acme/db/types";
import { SessionUser } from "@protoxyz/types";

export async function userIsAuthorizedForProject(
  prisma: PrismaClient,
  user: SessionUser,
  projectId: string,
) {
  if (user.claims?.orgId) {
    return (
      (await prisma.project.count({
        where: {
          id: projectId,
          ownerId: user.claims.orgId,
          ownerType: OwnerType.organization,
        },
      })) > 0
    );
  } else {
    return (
      (await prisma.project.count({
        where: {
          id: projectId,
          ownerId: user.sub,
          ownerType: OwnerType.user,
        },
      })) > 0
    );
  }
}
