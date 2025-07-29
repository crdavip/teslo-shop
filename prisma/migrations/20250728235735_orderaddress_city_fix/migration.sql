/*
  Warnings:

  - Added the required column `city` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAddress" ADD COLUMN     "city" TEXT NOT NULL;
