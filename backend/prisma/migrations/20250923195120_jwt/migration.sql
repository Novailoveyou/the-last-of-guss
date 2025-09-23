/*
  Warnings:

  - A unique constraint covering the columns `[jwt]` on the table `errors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."errors" ADD COLUMN     "jwt" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "errors_jwt_key" ON "public"."errors"("jwt");
