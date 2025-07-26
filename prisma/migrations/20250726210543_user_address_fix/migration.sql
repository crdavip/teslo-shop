/*
  Warnings:

  - You are about to drop the column `lalstName` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "lalstName",
ADD COLUMN     "lastName" TEXT NOT NULL;
