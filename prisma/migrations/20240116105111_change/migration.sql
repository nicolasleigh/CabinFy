/*
  Warnings:

  - Made the column `minBookingLength` on table `Settings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxBookingLength` on table `Settings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxGuestsPerBooking` on table `Settings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `breakfastPrice` on table `Settings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "minBookingLength" SET NOT NULL,
ALTER COLUMN "minBookingLength" SET DEFAULT 1,
ALTER COLUMN "maxBookingLength" SET NOT NULL,
ALTER COLUMN "maxBookingLength" SET DEFAULT 30,
ALTER COLUMN "maxGuestsPerBooking" SET NOT NULL,
ALTER COLUMN "maxGuestsPerBooking" SET DEFAULT 10,
ALTER COLUMN "breakfastPrice" SET NOT NULL,
ALTER COLUMN "breakfastPrice" SET DEFAULT 20;
