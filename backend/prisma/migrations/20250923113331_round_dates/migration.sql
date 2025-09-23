/*
  Warnings:

  - You are about to drop the column `status` on the `rounds` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[login]` on the table `errors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[login,password]` on the table `errors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roundId]` on the table `points` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[survivorId]` on the table `points` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roundId,survivorId]` on the table `points` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."points" ALTER COLUMN "value" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."rounds" DROP COLUMN "status",
ADD COLUMN     "end_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "start_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "public"."Status";

-- CreateIndex
CREATE UNIQUE INDEX "errors_login_key" ON "public"."errors"("login");

-- CreateIndex
CREATE UNIQUE INDEX "errors_login_password_key" ON "public"."errors"("login", "password");

-- CreateIndex
CREATE UNIQUE INDEX "points_roundId_key" ON "public"."points"("roundId");

-- CreateIndex
CREATE UNIQUE INDEX "points_survivorId_key" ON "public"."points"("survivorId");

-- CreateIndex
CREATE UNIQUE INDEX "points_roundId_survivorId_key" ON "public"."points"("roundId", "survivorId");
