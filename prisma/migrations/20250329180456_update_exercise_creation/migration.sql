-- AlterTable
ALTER TABLE "exercise_categories" ADD COLUMN     "exerciseId" INTEGER;

-- AddForeignKey
ALTER TABLE "exercise_categories" ADD CONSTRAINT "exercise_categories_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;
