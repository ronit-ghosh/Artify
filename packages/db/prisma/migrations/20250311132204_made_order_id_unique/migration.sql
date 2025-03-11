/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscription_paymentId_key" ON "Subscription"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_orderId_key" ON "Subscription"("orderId");
