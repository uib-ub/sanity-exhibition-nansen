import { getClient, previewClient } from './sanity.server'
import {
  actorsQuery,
  alertQuery,
  conceptsQuery,
  registryQuery,
  frontpageQuery,
  idsQuery,
  routesQuery,
  eventsQuery,
  humanMadeObjectsQuery,
  typeQuery,
  publicDocumentTypes,
  contactCopyQuery,
  physicalExhibitionQuery,
} from './queries'
import { siteSettings } from './queries/fragments'

/* const getUniques = (items) => {
  const ids = new Set()
  return items.filter((item) => {
    if (ids.has(item._id ?? item._key)) {
      return false
    } else {
      ids.add(item._id ?? item._key)
      return true
    }
  })
} */

export async function getFrontpage(preview) {
  const data = await getClient(preview).fetch(frontpageQuery)
  return data
}

export async function getRoutes() {
  const data = await getClient().fetch(routesQuery)
  return data
}

/**
 * Fetch Activity and Event documents and activityStream objects
 * @param {boolean} preview
 * @returns {object}
 */
export async function getEvents(preview) {
  const data = await getClient(preview).fetch(eventsQuery)

  const activityStreamsObjects = data.objects
    .map((o) => o.activityStream)
    .filter((o) => o.length != 0)

  const activityStream = {
    items: [...data.documents, ...activityStreamsObjects[0]],
    siteSettings: data.siteSettings,
  }

  return activityStream
}

export async function getPreviewHumanMadeObjectByID(id) {
  const data = await previewClient.fetch(
    `*[_id == $id || slug.current == $id || page._id == $id][0] {
      _id,
      _type,
      slug
    }`,
    { id },
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
  const results = await getClient(preview).fetch(idsQuery, { publicDocumentTypes })
  return results
}

export async function getType(id, preview) {
  const results = await getClient(preview).fetch(typeQuery, { id })
  return results
}

export async function getSiteSettings(preview) {
  const results = await getClient(preview).fetch(`{${siteSettings}}`)
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

export async function getPhysicalExhibitionCopy(preview) {
  const results = await getClient(preview).fetch(physicalExhibitionQuery)
  return results
}
