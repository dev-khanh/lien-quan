-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "featured_image_url" TEXT,
ADD COLUMN     "featured_order" INTEGER,
ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false;
