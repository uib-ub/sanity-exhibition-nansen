# Nansen Exhibition

Universitetsbiblioteket i Bergens repositorium for Sanity.io redigeringsklient og Next.js frontend. Nansen utstillingen er et samarbeid mellom biblioteket og prosjektet [Arven etter Nansen](https://arvenetternansen.com/). Utstillingen ble laget i perioden 2020-21. 

## Struktur

Repositoriet består av to mapper, `studio` og `web`. `studio` inneholder koden for å kjøre [Sanity Studio](https://www.sanity.io/docs/sanity-studio). Studio er en SPA React applikasjon, open source og kan tilpasses. Datamodellen lages i `studio/schemas` og defineres av bruker, se [Content modelling](https://www.sanity.io/docs/content-modelling) og [Schema types](https://www.sanity.io/docs/schema-types) for detaljer.

Studio er utvidet med én større plugin. `import-tool` er en "tool" som lar brukere søke i Marcus.uib.no, NB.no og Kulturnav.org. Objekter eller autoritetsdata kan importeres til Studio der de kan refereres til i tekst eller i andre sammenhenger.

Studio henter og lagrer data hos Sanity og det er derfor ikke nødvendig å ha en lokal database for utvikling eller tyngre driftsopplegg for produksjon.

`web` inneholder en [Next.js](https://nextjs.org/) applikasjon. Next.js er valgt fordi den kombinerer statisk genererte sider, klient-side applikasjoner eller en kombinasjon.

## Sanity Manage

[Sanity Manage](https://www.sanity.io/manage)

## Deployment

Både `studio` og `web` deployes til [Vercel.com](https://vercel.com/) via `git push`.

## Quick start

This repository uses `yarn`!

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

#### Instagram

In the studio you can embed Instagram posts, but you need a access token from Facebook. See https://www.npmjs.com/package/react-instagram-embed for details. Add the token to `.env.development` and as a enviroment variable on Vercel or Netlify.


## Stuck with Sanity? Get help

[![Slack Community Button](https://slack.sanity.io/badge.svg)](https://slack.sanity.io/)
