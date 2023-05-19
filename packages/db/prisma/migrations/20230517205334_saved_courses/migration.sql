/*
  Warnings:

  - You are about to drop the column `childId` on the `Edges` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Edges` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Nodes` table. All the data in the column will be lost.
  - You are about to drop the `_SavedCourses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `source` to the `Edges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `Edges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Nodes" DROP CONSTRAINT "Nodes_userId_fkey";

-- DropForeignKey
ALTER TABLE "_SavedCourses" DROP CONSTRAINT "_SavedCourses_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedCourses" DROP CONSTRAINT "_SavedCourses_B_fkey";

-- AlterTable
ALTER TABLE "Edges" DROP COLUMN "childId",
DROP COLUMN "parentId",
ADD COLUMN     "source" TEXT NOT NULL,
ADD COLUMN     "target" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Nodes" DROP COLUMN "userId",
ADD COLUMN     "parent" JSONB;

-- DropTable
DROP TABLE "_SavedCourses";

-- CreateTable
CREATE TABLE "_NodesToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NodesToUser_AB_unique" ON "_NodesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NodesToUser_B_index" ON "_NodesToUser"("B");

-- AddForeignKey
ALTER TABLE "_NodesToUser" ADD CONSTRAINT "_NodesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NodesToUser" ADD CONSTRAINT "_NodesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
