-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_cabinId_fkey";

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_cabinId_fkey" FOREIGN KEY ("cabinId") REFERENCES "Cabins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
