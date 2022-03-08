# Nansen Exhibition

Repository for the University of Bergen Library web exhibition "Nansen og bergenserne" (Nansen and the people of Bergen"). It includes a Sanity Studio editor and a Next.js frontend. 

The exhibition was a cooperation between the library and the project [Arven etter Nansen (The Nansen Legacy)](https://arvenetternansen.com/), created between 2020-21. 

## Deployment

Both `studio` and `web` is deployed by [Vercel.com](https://vercel.com/) via `git push`.

## Quick start

**NB!** This repository uses `yarn`!

1. Clone this repository
1. `yarn global add @sanity/cli`
2. `yarn install` in the project root folder on local
   - `sanity init` if you want a new studio
   - Add necessary variables for connecting to the correct Sanity project (if you have permission)
3. `yarn run dev` to start the studio and frontend locally
   - Your studio should be running on [http://localhost:3333](http://localhost:3333)
   - Your frontend should be running on [http://localhost:3000](http://localhost:3000)
4. `yarn run build` to build to production locally

## Environment variables and tokens

### Studio

```yaml
# Studio
SANITY_STUDIO_API_PROJECT_ID=
SANITY_STUDIO_API_DATASET=
SANITY_STUDIO_PREVIEW_SECRET=
# Deployment
SANITY_STUDIO_VERCEL_TOKEN=
SANITY_STUDIO_VERCEL_PROJECT_ID=
SANITY_STUDIO_VERCEL_DEPLOY_HOOK=
# Extras
SANITY_STUDIO_INSTAGRAM_TOKEN=
```

### Web 

```yaml
# Datalake
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
# Preview
NEXT_PUBLIC_SANITY_API_TOKEN=
NEXT_PUBLIC_SANITY_PREVIEW_SECRET=
# For correct proxy path
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_DOMAIN=
# Extras
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=
NEXT_PUBLIC_INSTAGRAM_TOKEN=
NEXT_PUBLIC_GOOGLE_ANALYTICS=
```

#### Instagram

In the studio you can embed Instagram posts, but you need a access token from Facebook. See https://www.npmjs.com/package/react-instagram-embed for details. Add the token to `./web/.env.development` and as a enviroment variable on Vercel or Netlify.

## Documentation

General documentation see [the docs](./docs/README.md)

