-- CreateTable
CREATE TABLE "category_fields" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "category_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_categories" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "exercise_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryFieldsToExerciseCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryFieldsToExerciseCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryFieldsToExerciseCategory_B_index" ON "_CategoryFieldsToExerciseCategory"("B");

-- AddForeignKey
ALTER TABLE "_CategoryFieldsToExerciseCategory" ADD CONSTRAINT "_CategoryFieldsToExerciseCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "category_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryFieldsToExerciseCategory" ADD CONSTRAINT "_CategoryFieldsToExerciseCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "exercise_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
