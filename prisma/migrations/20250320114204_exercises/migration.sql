-- CreateTable
CREATE TABLE "exercise_modalities" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "exercise_modalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "video" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseModalityId" INTEGER NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_exerciseModalityId_fkey" FOREIGN KEY ("exerciseModalityId") REFERENCES "exercise_modalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
