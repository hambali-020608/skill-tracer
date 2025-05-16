-- CreateTable
CREATE TABLE `UserProject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectName` VARCHAR(191) NOT NULL,
    `projectProof` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `skillId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProject` ADD CONSTRAINT `UserProject_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
