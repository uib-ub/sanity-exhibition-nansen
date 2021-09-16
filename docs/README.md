# Muna system

WIP! Nansen is based on the Muna software architecture. Muna is documented using the [C4 model](https://c4model.com/).

## Context

Software architecture overview.

![](./diagrams/context.svg)

## Container

Software systems that makes up the whole Muna software architecture.

Repositoriet består av to mapper, `studio` og `web`. `studio` inneholder koden for å kjøre [Sanity Studio](https://www.sanity.io/docs/sanity-studio). 

### Studio

Studio er en SPA React applikasjon, open source og kan tilpasses. Datamodellen lages i `studio/schemas` og defineres av bruker, se [Content modelling](https://www.sanity.io/docs/content-modelling) og [Schema types](https://www.sanity.io/docs/schema-types) for detaljer.

Studio er utvidet med én større plugin. `import-tool` er en "tool" som lar brukere søke i Marcus.uib.no, NB.no og Kulturnav.org. Objekter eller autoritetsdata kan importeres til Studio der de kan refereres til i tekst eller i andre sammenhenger.

Studio henter og lagrer data hos Sanity og det er derfor ikke nødvendig å ha en lokal database for utvikling eller tyngre driftsopplegg for produksjon.

![](./diagrams/container_studio.svg)

### Sanity Manage

[Sanity Manage](https://www.sanity.io/manage)

### Web

`web` inneholder en [Next.js](https://nextjs.org/) applikasjon. Next.js er valgt fordi den kombinerer statisk genererte sider, klient-side applikasjoner eller en kombinasjon.

## Deployment

WIP!

![](./diagrams/deployment.svg)