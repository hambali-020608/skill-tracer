/*
  Warnings:

  - You are about to alter the column `isDone` on the `Skill` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Skill` MODIFY `isDone` BOOLEAN NOT NULL;
