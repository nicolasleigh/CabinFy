/*
  Warnings:

  - You are about to drop the column `nationalId` on the `Guests` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `Guests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Guests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Guests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `Guests` table without a default value. This is not possible if the table is not empty.
  - The required column `uid` was added to the `Guests` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updated_at` to the `Guests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guests" DROP COLUMN "nationalId",
ADD COLUMN     "ip" INET,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "salt" TEXT NOT NULL,
ADD COLUMN     "uid" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Guests_uid_key" ON "Guests"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Guests_email_key" ON "Guests"("email");
