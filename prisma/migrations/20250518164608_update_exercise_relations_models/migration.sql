/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `category_fields` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `category_fields` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `exercise_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `exercise_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `exercise_modalities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `exercise_modalities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `muscle_groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `muscle_groups` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sets" ADD COLUMN     "distance" DOUBLE PRECISION,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION,
ALTER COLUMN "reps" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category_fields_label_key" ON "category_fields"("label");

-- CreateIndex
CREATE UNIQUE INDEX "category_fields_code_key" ON "category_fields"("code");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_categories_label_key" ON "exercise_categories"("label");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_categories_code_key" ON "exercise_categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_modalities_label_key" ON "exercise_modalities"("label");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_modalities_code_key" ON "exercise_modalities"("code");

-- CreateIndex
CREATE UNIQUE INDEX "muscle_groups_label_key" ON "muscle_groups"("label");

-- CreateIndex
CREATE UNIQUE INDEX "muscle_groups_code_key" ON "muscle_groups"("code");
