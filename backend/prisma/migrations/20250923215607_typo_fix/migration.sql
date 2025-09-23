/*
  Warnings:

  - You are about to drop the `errors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."points" DROP CONSTRAINT "points_survivorId_fkey";

-- DropTable
DROP TABLE "public"."errors";

-- CreateTable
CREATE TABLE "public"."survivors" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "jwt" TEXT,

    CONSTRAINT "survivors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "survivors_id_key" ON "public"."survivors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "survivors_login_key" ON "public"."survivors"("login");

-- CreateIndex
CREATE UNIQUE INDEX "survivors_jwt_key" ON "public"."survivors"("jwt");

-- CreateIndex
CREATE UNIQUE INDEX "survivors_login_password_key" ON "public"."survivors"("login", "password");

-- AddForeignKey
ALTER TABLE "public"."points" ADD CONSTRAINT "points_survivorId_fkey" FOREIGN KEY ("survivorId") REFERENCES "public"."survivors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
