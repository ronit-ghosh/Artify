-- CreateEnum
CREATE TYPE "ModelType" AS ENUM ('man', 'woman', 'other');

-- CreateEnum
CREATE TYPE "ModelEthinicty" AS ENUM ('white', 'black', 'asian_american', 'east_asian', 'south_east_asian', 'south_asian', 'middle_eastern', 'pacific', 'hispanic');

-- CreateEnum
CREATE TYPE "ModelEyeColor" AS ENUM ('brown', 'blue', 'gray');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ModelType" NOT NULL,
    "age" INTEGER NOT NULL,
    "ethnicity" "ModelEthinicty" NOT NULL,
    "eyecolor" "ModelEyeColor" NOT NULL,
    "bald" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,

    CONSTRAINT "TrainingImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutputImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,

    CONSTRAINT "OutputImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Packs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Packs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackPrompts" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "packId" TEXT NOT NULL,

    CONSTRAINT "PackPrompts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainingImages" ADD CONSTRAINT "TrainingImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutputImages" ADD CONSTRAINT "OutputImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackPrompts" ADD CONSTRAINT "PackPrompts_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
