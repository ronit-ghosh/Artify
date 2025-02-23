/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PackPrompts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `PackPrompts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PackPrompts" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PackPrompts_name_key" ON "PackPrompts"("name");
