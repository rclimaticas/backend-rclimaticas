/*
  Warnings:

  - You are about to drop the column `link` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the column `media` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `materials` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `materials` table. All the data in the column will be lost.
  - Added the required column `email` to the `materials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `materials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicationType` to the `materials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectType` to the `materials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "materials" DROP COLUMN "link",
DROP COLUMN "media",
DROP COLUMN "source",
DROP COLUMN "topic",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fileUpload" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "publicationType" TEXT NOT NULL,
ADD COLUMN     "subjectType" TEXT NOT NULL;
