/*
  Warnings:

  - You are about to drop the `_NodesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_NodesToUser" DROP CONSTRAINT "_NodesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_NodesToUser" DROP CONSTRAINT "_NodesToUser_B_fkey";

-- DropTable
DROP TABLE "_NodesToUser";

-- CreateTable
CREATE TABLE "UsersSavedNodes" (
    "userId" TEXT NOT NULL,
    "nodesId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UsersSavedNodes_pkey" PRIMARY KEY ("userId","nodesId")
);

-- AddForeignKey
ALTER TABLE "UsersSavedNodes" ADD CONSTRAINT "UsersSavedNodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSavedNodes" ADD CONSTRAINT "UsersSavedNodes_nodesId_fkey" FOREIGN KEY ("nodesId") REFERENCES "Nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
