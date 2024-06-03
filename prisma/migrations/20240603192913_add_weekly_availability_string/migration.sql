-- AlterTable
ALTER TABLE "users" ALTER COLUMN "weeklyAvailability" DROP NOT NULL,
ALTER COLUMN "weeklyAvailability" DROP DEFAULT,
ALTER COLUMN "weeklyAvailability" SET DATA TYPE TEXT;
