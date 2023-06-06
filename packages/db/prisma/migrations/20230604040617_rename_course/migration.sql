/*
  Warnings:

  - You are about to drop the `Courses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "UsersSavedNodes" DROP CONSTRAINT "UsersSavedNodes_coursesId_fkey";

-- DropTable
DROP TABLE "Courses";

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'courseNode',
    "parent" JSONB NOT NULL,
    "prerequisites" TEXT[],
    "resources" JSONB,
    "learningObjectives" TEXT[],
    "syllabus" JSONB,
    "experts" TEXT[],
    "subjectId" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersSavedNodes" ADD CONSTRAINT "UsersSavedNodes_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
