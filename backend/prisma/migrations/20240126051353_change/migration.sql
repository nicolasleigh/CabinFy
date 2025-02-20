/*
  Warnings:

  - You are about to drop the column `maxCapacity` on the `Cabins` table. All the data in the column will be lost.
  - Added the required column `bedroom` to the `Cabins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Cabins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cabins" DROP COLUMN "maxCapacity",
ADD COLUMN     "bedroom" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL;
