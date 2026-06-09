-- AlterEnum
ALTER TYPE "AccountStatus" ADD VALUE 'maintenance';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OrderStatus" ADD VALUE 'cancelled';
ALTER TYPE "OrderStatus" ADD VALUE 'expired';

-- AlterTable
ALTER TABLE "account_update_logs" ADD COLUMN     "field_name" TEXT,
ADD COLUMN     "new_value" TEXT,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "old_value" TEXT;

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "admin_note" TEXT,
ADD COLUMN     "battle_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "login_note" TEXT;

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'admin';
