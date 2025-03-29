/*
  Warnings:

  - You are about to drop the `_ExerciseToExerciseCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `exerciseCategory` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseToExerciseCategory" DROP CONSTRAINT "_ExerciseToExerciseCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToExerciseCategory" DROP CONSTRAINT "_ExerciseToExerciseCategory_B_fkey";

-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "exerciseCategory" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ExerciseToExerciseCategory";

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_exerciseCategory_fkey" FOREIGN KEY ("exerciseCategory") REFERENCES "exercise_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
