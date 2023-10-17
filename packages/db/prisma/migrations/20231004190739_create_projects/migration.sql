-- CreateEnum
CREATE TYPE "OwnerType" AS ENUM ('user', 'organization');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT,
    "ownerId" TEXT,
    "ownerType" "OwnerType" NOT NULL DEFAULT 'user',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Project_creatorId_idx" ON "Project"("creatorId");

-- CreateIndex
CREATE INDEX "Project_ownerId_ownerType_idx" ON "Project"("ownerId", "ownerType");

-- CreateIndex
CREATE UNIQUE INDEX "Project_createdAt_key" ON "Project"("createdAt");
