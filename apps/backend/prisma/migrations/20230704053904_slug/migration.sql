/*
  Warnings:

  - Made the column `slug` on table `Food` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Food" ALTER COLUMN "ingredients" SET NOT NULL,
ALTER COLUMN "ingredients" SET DATA TYPE TEXT,
ALTER COLUMN "slug" SET NOT NULL;
