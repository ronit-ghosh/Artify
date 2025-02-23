/*
  Warnings:

  - Added the required column `category` to the `Packs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Packs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Packs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Packs" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;
