-- CreateEnum
CREATE TYPE "ModelTrainingStatus" AS ENUM ('pending', 'generated', 'failed');

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "falAiReqId" TEXT,
ADD COLUMN     "status" "ModelTrainingStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "triggerWord" TEXT;

-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "falAiReqId" TEXT,
ALTER COLUMN "imageUrl" SET DEFAULT '';
