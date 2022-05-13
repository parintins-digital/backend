/*
  Warnings:

  - The primary key for the `Picture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Visit` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Visit` DROP FOREIGN KEY `Visit_pictureId_fkey`;

-- DropForeignKey
ALTER TABLE `Visit` DROP FOREIGN KEY `Visit_userId_fkey`;

-- AlterTable
ALTER TABLE `Picture` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Visit` DROP PRIMARY KEY,
    MODIFY `userId` CHAR(36) NOT NULL,
    MODIFY `pictureId` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`userId`, `pictureId`);

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_pictureId_fkey` FOREIGN KEY (`pictureId`) REFERENCES `Picture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
