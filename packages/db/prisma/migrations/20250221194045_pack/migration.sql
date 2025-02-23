/*
  Warnings:

  - The primary key for the `Packs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Packs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[prompt]` on the table `PackPrompts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Packs` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `packId` on the `PackPrompts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "PackPrompts" DROP CONSTRAINT "PackPrompts_packId_fkey";

-- AlterTable
ALTER TABLE "PackPrompts" DROP COLUMN "packId",
ADD COLUMN     "packId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Packs" DROP CONSTRAINT "Packs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Packs_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PackPrompts_prompt_key" ON "PackPrompts"("prompt");

-- CreateIndex
CREATE UNIQUE INDEX "Packs_name_key" ON "Packs"("name");

-- AddForeignKey
ALTER TABLE "PackPrompts" ADD CONSTRAINT "PackPrompts_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
