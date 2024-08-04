/*
  Warnings:

  - You are about to drop the column `fileUpload` on the `materials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "materials" DROP COLUMN "fileUpload";

-- CreateTable
CREATE TABLE "fileupload" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "materialId" INTEGER NOT NULL,

    CONSTRAINT "fileupload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "impacts" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "support" TEXT NOT NULL,
    "affectedCommunity" TEXT NOT NULL,
    "biomes" TEXT[],
    "situation" TEXT NOT NULL,
    "contribution" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "impacts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fileupload" ADD CONSTRAINT "fileupload_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impacts" ADD CONSTRAINT "impacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
