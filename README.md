# Thuê Acc Liên Quân

Next.js + TypeScript + TailwindCSS + Prisma/PostgreSQL app cho thuê tài khoản game Liên Quân.

## Setup

```bash
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Admin mẫu sau khi seed:

```text
Email: admin@lienquan.local
Password: Admin@123
```

## Cron hết hạn thuê

Chạy mỗi phút bằng crontab, scheduler hoặc dịch vụ cron:

```bash
npm run cron:expire
```

Hoặc gọi endpoint:

```bash
curl "http://localhost:3000/api/cron/expire-rentals?secret=$CRON_SECRET"
```

## Ghi chú bảo mật

- Admin password được hash bằng bcrypt.
- Cookie admin là JWT httpOnly.
- API admin dùng middleware `requireAdmin`.
- Tài khoản/mật khẩu game được mã hóa AES-GCM bằng `ACCOUNT_SECRET`.
- Upload ảnh chỉ nhận jpg/png/webp, tối đa 3MB.
