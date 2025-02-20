/*
  Warnings:

  - You are about to drop the column `observation` on the `Bookings` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_guestId_fkey";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "observation",
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "guestId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guests"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
