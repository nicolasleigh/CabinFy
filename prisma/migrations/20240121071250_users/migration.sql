-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "token" TEXT,
ADD COLUMN     "token_exp" TIMESTAMP(3);
