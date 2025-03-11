-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'captured');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'pending';
