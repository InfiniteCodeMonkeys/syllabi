-- AlterTable
ALTER TABLE "User" ADD COLUMN     "savedCourses" TEXT[];

-- CreateTable
CREATE TABLE "SuggestedCourses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "learningObjectives" TEXT[],
    "syllabus" JSONB NOT NULL,
    "userId" TEXT,

    CONSTRAINT "SuggestedCourses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SuggestedCourses" ADD CONSTRAINT "SuggestedCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
