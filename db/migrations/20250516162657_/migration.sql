/*
  Warnings:

  - Added the required column `isChecked` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Progress` ADD COLUMN `isChecked` BOOLEAN NOT NULL;
