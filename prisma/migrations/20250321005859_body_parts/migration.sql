-- CreateTable
CREATE TABLE "body_parts" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "body_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BodyPartToExercise" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BodyPartToExercise_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BodyPartToExercise_B_index" ON "_BodyPartToExercise"("B");

-- AddForeignKey
ALTER TABLE "_BodyPartToExercise" ADD CONSTRAINT "_BodyPartToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "body_parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BodyPartToExercise" ADD CONSTRAINT "_BodyPartToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
