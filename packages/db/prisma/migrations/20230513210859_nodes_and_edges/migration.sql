/*
  Warnings:

  - You are about to drop the column `savedCourses` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuggestedCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_userId_fkey";

-- DropForeignKey
ALTER TABLE "SuggestedCourses" DROP CONSTRAINT "SuggestedCourses_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "savedCourses";

-- DropTable
DROP TABLE "Courses";

-- DropTable
DROP TABLE "Subjects";

-- DropTable
DROP TABLE "SuggestedCourses";

-- CreateTable
CREATE TABLE "SuggestedNodes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'fieldNode',
    "parents" TEXT[],
    "children" JSONB NOT NULL,
    "details" JSONB NOT NULL,
    "userId" TEXT,

    CONSTRAINT "SuggestedNodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nodes" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'fieldNode',
    "children" TEXT[],
    "details" JSONB,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edges" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,

    CONSTRAINT "Edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SavedCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SavedCourses_AB_unique" ON "_SavedCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedCourses_B_index" ON "_SavedCourses"("B");

-- AddForeignKey
ALTER TABLE "SuggestedNodes" ADD CONSTRAINT "SuggestedNodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nodes" ADD CONSTRAINT "Nodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedCourses" ADD CONSTRAINT "_SavedCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedCourses" ADD CONSTRAINT "_SavedCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
