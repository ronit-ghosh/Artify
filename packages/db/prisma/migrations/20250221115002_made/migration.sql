/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Model` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Model_name_key" ON "Model"("name");
