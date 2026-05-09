-- CreateTable
CREATE TABLE `leads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `interest` VARCHAR(191) NULL,
    `sourcePage` VARCHAR(191) NULL,
    `propertyType` VARCHAR(191) NULL,
    `investmentBand` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `crmStatus` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `crmResponse` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
