/*
  Warnings:

  - A unique constraint covering the columns `[roundId,survivorId]` on the table `points` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "points_roundId_survivorId_key" ON "public"."points"("roundId", "survivorId");
