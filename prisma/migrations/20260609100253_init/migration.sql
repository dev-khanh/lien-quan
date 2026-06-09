-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('available', 'renting', 'hidden');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'confirmed', 'renting', 'completed', 'rejected');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "RentalPackage" AS ENUM ('hourly', 'night', 'daily');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "hero_count" INTEGER NOT NULL DEFAULT 0,
    "skin_count" INTEGER NOT NULL DEFAULT 0,
    "sss_count" INTEGER NOT NULL DEFAULT 0,
    "collaboration_count" INTEGER NOT NULL DEFAULT 0,
    "rank" TEXT NOT NULL,
    "win_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reputation" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "vip_level" TEXT NOT NULL,
    "price_hourly" INTEGER NOT NULL,
    "price_night" INTEGER NOT NULL,
    "price_daily" INTEGER NOT NULL,
    "status" "AccountStatus" NOT NULL DEFAULT 'available',
    "thumbnail_url" TEXT NOT NULL,
    "game_username_enc" TEXT,
    "game_password_enc" TEXT,
    "current_rent_ends_at" TIMESTAMP(3),
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_images" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rent_orders" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "package_type" "RentalPackage" NOT NULL,
    "duration_hours" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "bill_image_url" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "admin_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rent_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "order_id" TEXT,
    "customer_name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_update_logs" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "admin_id" TEXT,
    "action" TEXT NOT NULL,
    "changes" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "account_update_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_slug_key" ON "accounts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "account_images" ADD CONSTRAINT "account_images_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent_orders" ADD CONSTRAINT "rent_orders_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "rent_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_update_logs" ADD CONSTRAINT "account_update_logs_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
