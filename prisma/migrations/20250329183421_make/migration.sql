/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `exercise_categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercise_categories" DROP CONSTRAINT "exercise_categories_exerciseId_fkey";

-- AlterTable
ALTER TABLE "exercise_categories" DROP COLUMN "exerciseId";

-- CreateTable
CREATE TABLE "_ExerciseToExerciseCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExerciseToExerciseCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseToExerciseCategory_B_index" ON "_ExerciseToExerciseCategory"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseCategory" ADD CONSTRAINT "_ExerciseToExerciseCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseCategory" ADD CONSTRAINT "_ExerciseToExerciseCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "exercise_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
