/*
  Warnings:

  - You are about to drop the column `exerciseModalityId` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `exerciseModality` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_exerciseModalityId_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "exerciseModalityId",
ADD COLUMN     "exerciseModality" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_exerciseModality_fkey" FOREIGN KEY ("exerciseModality") REFERENCES "exercise_modalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
