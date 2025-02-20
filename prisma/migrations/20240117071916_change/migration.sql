-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_cabinId_fkey";

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_cabinId_fkey" FOREIGN KEY ("cabinId") REFERENCES "Cabins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
