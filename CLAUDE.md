# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Thuê Acc Liên Quân" — Vietnamese-language app for renting Liên Quân (Arena of Valor) game accounts. Next.js 14 App Router + TypeScript + Tailwind + Prisma/PostgreSQL. Path alias `@/*` → repo root. UI copy and many slugs are Vietnamese (`/tuong` heroes, `/tin-tuc` news, `/acc/[slug]`).

## Commands

```bash
npm install                      # postinstall runs `prisma generate`
cp .env.example .env
npx prisma migrate dev --name init
npm run seed                     # admin: admin@lienquan.local / Admin@123
npm run dev | build | start | lint
npm run cron:expire              # expire overdue rentals (tsx scripts/expire-rentals.ts)
npx prisma migrate deploy        # production migrations
```

No test suite exists. CI (`.github/workflows/ci.yml`) only runs `npm ci`, `prisma generate`, `npm run build`.

## Architecture

- **Public site**: `app/page.tsx`, `app/acc/[slug]`, `app/accounts/[id]`, `app/tuong/*`, `app/tin-tuc/*`, plus catch-all `app/[...slug]`. SEO via `app/sitemap.ts` / `app/robots.ts`. Hero data lives in `lib/heroes.ts`.
- **Admin UI** is under `/pt-admin/*` (guarded by `middleware.ts`, which only checks that an `admin_token` cookie *exists* — real verification happens in API routes). `app/admin/[...path]` and `app/admin/layout.tsx` are separate from `pt-admin`; check them before assuming which is live.
- **API**: `app/api/*` route handlers. Admin endpoints under `app/api/admin/*` authenticate through `lib/auth.ts` (JWT in httpOnly `admin_token` cookie, 7d, bcrypt passwords). Public endpoints: `accounts`, `rent-orders`, `reviews`. Inputs validated with zod in `lib/validators.ts`.
- **Data model** (`prisma/schema.prisma`): `Account` (+`AccountImage`, `AccountUpdateLog`), `RentOrder` (status + `RentalPackage` enums), `Review` (+`ReviewImage`, moderated via `ReviewStatus`), `Admin`, `ShopSettings`, `Post`. Account status transitions are one route per state (`set-available`, `set-renting`, `set-maintenance`, `hide`, `show`) plus a generic `status` route.
- **Rental expiry**: `lib/expire-rentals.ts` is the single implementation, invoked by both `scripts/expire-rentals.ts` (CLI) and `GET /api/cron/expire-rentals?secret=$CRON_SECRET`. Needs an external scheduler (every minute).
- **Account credentials** are encrypted with `lib/crypto.ts` using `ACCOUNT_SECRET` (≥32 bytes) — changing it breaks decryption of stored data.
- **Uploads** (`lib/upload.ts`) write to local disk at `public/uploads/` (jpg/png/webp, 5MB). This requires a persistent filesystem — it won't survive on serverless/ephemeral hosts.

## Env vars

`DATABASE_URL`, `JWT_SECRET`, `ACCOUNT_SECRET`, `CRON_SECRET`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_ZALO_URL` (see `.env.example`). `lib/auth.ts` falls back to a hardcoded dev JWT secret if `JWT_SECRET` is unset — always set it in production.

## Deployment

- GitHub Actions `deploy-netlify.yml` triggers a Netlify build hook (secret `NETLIFY_BUILD_HOOK`) on push to `main`; domain `thueacclienquan.com`. Details in `.github/workflows/README.md`.
- `tools/` holds VPS helper material (`run.sh`, `run-server.sh`, a `.pem` key, a DB dump). I did not read these; see "Open items" below.

## Open items for the maintainer

- `.env.example` contains what looks like a real `NGROK` auth token, and `tools/lien-quan.pem` (private key) and `tools/lien_quan.dump` are tracked in git. Rotate/remove these and add them to `.gitignore`.
