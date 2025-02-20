-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "minBookingLength" DROP NOT NULL,
ALTER COLUMN "maxBookingLength" DROP NOT NULL,
ALTER COLUMN "maxGuestsPerBooking" DROP NOT NULL,
ALTER COLUMN "breakfastPrice" DROP NOT NULL;
