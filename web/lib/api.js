import {sanityClient, previewClient} from './sanity.server'
import {
  actorsQuery,
  alertQuery,
  conceptsQuery,
  registryQuery,
  frontpageQuery,
  idsQuery,
  routeQuery, 
  routesQuery,
  eventsQuery,
  humanMadeObjectsQuery,
  typeQuery,
  publicDocumentTypes, 
  contactCopyQuery} from './queries'
import {
  humanMadeObjectFields, 
  groupFields, 
  pageFields,
  siteSettings } from './queries/fragments'

const getClient = (preview) => (preview ? previewClient : sanityClient)

const getUniques = (items) => {
  const ids = new Set()
  return items.filter((item) => {
    if (ids.has(item._id ?? item._key)) {
      return false
    } else {
      ids.add(item._id ?? item._key)
      return true
    }
  })
}

export async function getFrontpage(preview) {
  const data = await getClient(preview).fetch(frontpageQuery)
  return data
}

export async function getRoutes(preview) {
  const data = await getClient(preview).fetch(routesQuery)
  return data
}

export async function getRoute(preview, id) {
  // Next passes an array based on the path. Join with / if array.
  const joinID = (typeof id === 'string') ? id : id.join('/')

  const data = await getClient(preview).fetch(
    JSON.parse(JSON.stringify(routeQuery)), // Too long query?
    {joinID},
  )
  return data
}

export async function getEvents(preview) {
  const data = await getClient(preview).fetch(
    eventsQuery
  )
  return data
}

export async function getPreviewHumanMadeObjectByID(id) {
  const data = await previewClient.fetch(
    `*[_id == $id || slug.current == $id || page._id == $id][0] {
      _id,
      _type,
      slug
    }`,
    {id},
  )
  return data
}

export async function getAllHumanMadeObjects(preview) {
  const data = await getClient(preview).fetch(humanMadeObjectsQuery)
  return data
}

export async function getAllActors(preview) {
  const data = await getClient(preview).fetch(actorsQuery)
  return data
}

export async function getAllConcepts(preview) {
  const data = await getClient(preview).fetch(conceptsQuery)
  return data
}

export async function getRegistry(preview) {
  const data = await getClient(preview).fetch(registryQuery)
  return data
}

export async function getIdPaths(preview) {
  const results = await getClient(preview).fetch(
    idsQuery,
    {publicDocumentTypes},
    )
    return results
  }
  
export async function getType(id, preview) {
  const results = await getClient(preview).fetch(
    typeQuery,
    {id},
  )
  return results
}
  
export async function getId(id, type, preview) {
  const results = await getClient(preview).fetch(
    `{
      "item": *[_id == $id][0] {
        ${type._type === 'HumanMadeObject' ? humanMadeObjectFields : ''}
        ${type._type === 'Actor' ? groupFields : ''}
        ${type._type === 'Group' ? groupFields : ''}
        ${type._type === 'Place' ? groupFields : ''}
        ${type._type === 'Concept' ? groupFields : ''}
        ${type._type === 'ObjectType' ? groupFields : ''}
        ${type._type === 'Event' ? groupFields : ''}
        ${type._type === 'Page' ? pageFields : ''}
      },
      ${siteSettings}
    }`,
    {id},
  )
  return results
}

export async function getSiteSettings(preview) {
  const results = await getClient(preview).fetch(
    `{${siteSettings}}`
  )
  return results
}

export async function getAlert(preview) {
  const results = await getClient(preview).fetch(alertQuery)
  return results
}

export async function getContactCopy(preview) {
  const results = await getClient(preview).fetch(contactCopyQuery)
  return results
}
