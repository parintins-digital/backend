/*
  Warnings:

  - Added the required column `author` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Picture` ADD COLUMN `author` VARCHAR(191) NOT NULL;
