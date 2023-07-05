/*
  Warnings:

  - Changed the type of `cooking_duration` on the `Food` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `serves` on the `Food` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "cooking_duration",
ADD COLUMN     "cooking_duration" INTEGER NOT NULL,
DROP COLUMN "serves",
ADD COLUMN     "serves" INTEGER NOT NULL;
