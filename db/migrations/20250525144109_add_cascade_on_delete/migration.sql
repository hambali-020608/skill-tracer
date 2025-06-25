-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_skillId_fkey`;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
