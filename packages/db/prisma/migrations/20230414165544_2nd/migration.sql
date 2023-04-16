/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Field";

-- CreateTable
CREATE TABLE "Nodes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "syllabus" TEXT[],
    "parents" TEXT[],
    "children" TEXT[],
    "userId" TEXT,

    CONSTRAINT "Nodes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Nodes" ADD CONSTRAINT "Nodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
