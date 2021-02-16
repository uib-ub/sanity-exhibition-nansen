import client, {previewClient} from './sanity'
const getClient = (preview) => (preview ? previewClient : client)

const publicDocumentTypes = ['HumanMadeObject', 'Actor', 'Group', 'Concept', 'ObjectType', 'Place']

const getUniqueDocuments = (items) => {
  const ids = new Set()
  return items.filter((item) => {
    if (ids.has(item._id)) {
      return false
    } else {
      ids.add(item._id)
      return true
    }
  })
}

const defaultNavMenu = `
  "defaultNavMenu": *[_id == "05ded800-23e4-453b-9b33-db08177480a9"][0] {
    ...,
    items[]{
      ...,
      "route": landingPageRoute->.slug.current
    }
  }
`

const humanMadeObjectFields = `
  "id": _id,
  _id,
  _type,
  depicts[]-> {
    "id": _id,
    label,
    image
  },
  label,
  hasType[]-> {
    ...
  },
  subjectOfManifest,
  image{
    ...,
    "palette": asset->.metadata.palette{
    	darkMuted,
      darkVibrant,
      dominant,
      lightMuted,
      vibrantMuted,
      muted,
      vibrant
    }
  },
  "manifest": coalesce(subjectOfManifest, "/api/manifest/" + _id),
  preferredIdentifier,
  identifiedBy[] {
    ...,
    hasType[]-> {
      ...
    },
    language[]-> {
      ...
    }
  },
  activityStream[]{
    _type == 'reference' => @->{
      ...,
      carriedOutBy[]{
        ...,
        actor->{
          _id,
          label,
          image{
            asset->
          }
        }
      }
    },
    ...,
    hasType[]-> {
      ...
    },
    tookPlaceAt[]->,
    movedFrom->{
      _id,
      label,
      geoJSON
    },
    movedTo->{
      _id,
      label,
      geoJSON
    },
    carriedOutBy[]{
      _type == 'reference' => @->{
        'actor': {
          _id,
          label,
          image{
            asset->
          }
        }
      },
      ...,
      actor->{
        _id,
        label,
        image{
          asset->
        }
      }
    },
    target->{
      _id,
      label,
      image{
        asset->
      }
    }
  },
  referredToBy[] {
    ...,
    body[] {
    ...,
      _type == 'reference' => @->{
        _id,
        _type,
        preferredIdentifier,
        label,
        subjectOfManifest,
        image{
          ...,
          asset->
        }
      }
    },
    hasType[]-> {
      ...
    },
    language-> {
      ...
    }
  },
  hasCurrentOwner[]-> {
    _id,
    label
  },
  subject[]-> {
    ...
  }
`

const groupFields = `
  "id": _id,
  _id,
  _type,
  label,
  hasType[]-> {
    ...
  },
  image {
    ...
  },
  referredToBy[] {
    ...
  },
  "hasMember": *[_type in ["Actor", "Group"] && references(^._id)]{ 
    "id": _id,
    _type,
    label
  },
  "mentionedIn": *[_type in ["HumanMadeObject"] && references(^._id)]{ 
    "id": _id,
    _type,
    label,
    image
  }
`

export async function getFrontpage() {
  const data = await getClient(true).fetch(
    `{
      "frontpage": *[ _id == "frontpage" ][0] {
        "id": _id,
        ...,
        navMenu-> {
          ...,
          items[] {
            ...,
            "route": landingPageRoute->.slug.current
          }
        },
        content[] {
          disabled != true => {
            ...
          },
          _type == 'MiradorGallery' && disabled != true => @{
            ...,
            items[] {
              "manifest": coalesce(manifestRef->.subjectOfManifest, manifestUrl),
              canvasUrl,
            },
          },
          _type == 'SingleObject'  && disabled != true => @{
            ...,
						item-> {
            "manifest": coalesce(subjectOfManifest, manifestUrl),
              canvasUrl,
            }
          }
        }
      },
      "latest": *[ _type == "HumanMadeObject"][0..10] {
        "id": _id,
        label,
        hasType[]-> {
          ...
        },
        image,	
      }
    }`,
  )
  return data
}

export async function getRoutes() {
  const data = await getClient(true).fetch(
    `*[ _type == "Route" ] {
      "id": _id,
      slug,
      _type
    }`,
  )
  return data
}

export async function getRouteBySlug(id) {
  // Next passes an array based on the path. Join with / if array.
  const joinID = (typeof id === 'string') ? id : id.join('/')

  const data = await getClient(true).fetch(
    `*[ _type == "Route" && slug.current == $joinID ][0] {
        "id": _id,
        ...,
        page->{
          ...,
          navMenu->{
            ...,
            items[]{
              ...,
              "route": landingPageRoute->.slug.current
            }
          },
          content[] {
            ...,
            _type == 'MiradorGallery' => @{
              ...,
              items[] {
                "manifest": coalesce(manifestRef->.subjectOfManifest, manifestUrl),
                canvasUrl,
              },
            },
            _type == 'SingleObject' => @{
              ...,
              item-> {
              "manifest": coalesce(subjectOfManifest, manifestUrl),
                canvasUrl,
              }
            }
          }
        }
    }`,
    {joinID},
  )
  return data
}

export async function getPreviewMadeObjectByID(id) {
  const data = await getClient(true).fetch(
    `*[_type == "HumanMadeObject" && _id == $id]{
      ${humanMadeObjectFields}
    }`,
    {id},
  )
  return data[0]
}

export async function getAllMadeObjects() {
  const data = await client.fetch(`{
    "items": *[_type == "HumanMadeObject"]{ 
      "id": _id,
      _type,
      label,
      hasType[]-> {
        _id,
        label
      },
      "aspectRatio": image.asset->.metadata.dimensions.aspectRatio,
      image
    },
    ${defaultNavMenu}
  }`)
  return data
}

export async function getAllActors() {
  const data = await client.fetch(`{
    "items": *[_type in ["Actor", "Group"]] | order(label, desc){ 
      "id": _id,
      _type,
      label,
      hasType[]-> {
        _id,
        label
      },
      image,
      "count": count(*[references(^._id)]),
    },
    ${defaultNavMenu}
  }`)
  return data
}

export async function getAllConcepts() {
  const data = await client.fetch(`{
    "items": *[_type in ["Concept", "ObjectType"]] | order(label.nor, desc){ 
      "id": _id,
      _id,
      _type,
      label,
      "count": count(*[references(^._id)]),
    },
    ${defaultNavMenu}
  }`)
  return data
}

export async function getType(id, preview) {
  const results = await getClient(preview).fetch(
    `*[_id == $id][0] {
      "type": _type
    }`,
    {id},
  )
  return results
}

export async function getIdPaths(preview) {
  const results = await getClient(preview).fetch(
    `*[_type in [...$publicDocumentTypes]] {
      "id": _id
    }`,
    {publicDocumentTypes},
  )
  return results
}

export async function getId(id, type, preview) {
  const results = await getClient(preview).fetch(
    `{
      "item": *[_id == $id][0] {
        ${type.type === 'HumanMadeObject' ? humanMadeObjectFields : ''}
        ${type.type === 'Actor' ? groupFields : ''}
        ${type.type === 'Group' ? groupFields : ''}
        ${type.type === 'Place' ? groupFields : ''}
        ${type.type === 'Concept' ? groupFields : ''}
        ${type.type === 'ObjectType' ? groupFields : ''}
      },
      ${defaultNavMenu}
    }`,
    {id},
  )
  return results
}

export async function getAlert(preview) {
  const results = await getClient(preview).fetch(`*[_type == "Alert"][0] | order(_createdAt desc) {
      ...
    }`)
  return results
}
