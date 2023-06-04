-- AlterTable
ALTER TABLE "UsersSavedNodes" ADD COLUMN     "coursesId" TEXT;

-- CreateTable
CREATE TABLE "Courses" (
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

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersSavedNodes" ADD CONSTRAINT "UsersSavedNodes_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "Courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
