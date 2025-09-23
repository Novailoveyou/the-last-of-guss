-- CreateTable
CREATE TABLE "public"."errors" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "jwt" TEXT,

    CONSTRAINT "errors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."points" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" INTEGER NOT NULL DEFAULT 0,
    "roundId" TEXT NOT NULL,
    "survivorId" TEXT NOT NULL,

    CONSTRAINT "points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rounds" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rounds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "errors_id_key" ON "public"."errors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "errors_login_key" ON "public"."errors"("login");

-- CreateIndex
CREATE UNIQUE INDEX "errors_jwt_key" ON "public"."errors"("jwt");

-- CreateIndex
CREATE UNIQUE INDEX "errors_login_password_key" ON "public"."errors"("login", "password");

-- CreateIndex
CREATE UNIQUE INDEX "points_id_key" ON "public"."points"("id");

-- CreateIndex
CREATE UNIQUE INDEX "points_roundId_key" ON "public"."points"("roundId");

-- CreateIndex
CREATE UNIQUE INDEX "points_survivorId_key" ON "public"."points"("survivorId");

-- CreateIndex
CREATE UNIQUE INDEX "points_roundId_survivorId_key" ON "public"."points"("roundId", "survivorId");

-- CreateIndex
CREATE UNIQUE INDEX "rounds_id_key" ON "public"."rounds"("id");

-- AddForeignKey
ALTER TABLE "public"."points" ADD CONSTRAINT "points_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "public"."rounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."points" ADD CONSTRAINT "points_survivorId_fkey" FOREIGN KEY ("survivorId") REFERENCES "public"."errors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
