-- CreateTable
CREATE TABLE "shop_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "shop_name" TEXT NOT NULL DEFAULT 'Shop thuê ACC Liên Quân',
    "zalo_phone" TEXT,
    "zalo_url" TEXT,
    "facebook_url" TEXT,
    "rental_guide" TEXT,
    "bank_info" TEXT,
    "payment_qr_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_settings_pkey" PRIMARY KEY ("id")
);
