# GitHub CI/CD

## CI

`ci.yml` runs on pull requests and pushes to `main`/`master`:

- installs dependencies with `npm ci`
- generates Prisma Client
- runs `npm run build`

## Netlify deploy

`deploy-netlify.yml` triggers a production deploy through a Netlify Build Hook on pushes to `main`/`master` or manual `workflow_dispatch`.

Required GitHub repository secret:

- `NETLIFY_BUILD_HOOK`: Netlify site build hook URL

Netlify still needs runtime environment variables configured in Netlify, especially:

- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL=https://thueacclienquan.com`

Run the database migration on deploy or from a safe admin machine:

```sh
npx prisma migrate deploy
```
