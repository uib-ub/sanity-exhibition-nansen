import {siteSettings} from './defaults'

/**
 * Enum of Classes that should generate pages
 * @readonly
 * @enum {array}
 */
export const publicDocumentTypes = [
  'HumanMadeObject',
  'Actor',
  'Group',
  'Concept',
  'ObjectType',
  'Place',
]

export const actorsQuery = `
  {
    "items": *[_type in ["Actor", "Group"]] | order(label, desc){ 
      _id,
      _type,
      label,
      hasType[]-> {
        _id,
        label
      },
      image,
      "count": count(*[references(^._id)]),
    },
    ${siteSettings}
  }
`

export const alertQuery = `
  *[_type == "Alert"][0] | order(_createdAt desc) {
    ...
  }
`

export const conceptsQuery = `
  {
    "items": *[_type in ["Concept", "ObjectType"]] | order(label.nor desc){ 
      _id,
      _type,
      label,
      "count": count(*[references(^._id)]),
    },
    ${siteSettings}
  }
`

export const registryQuery = `
  {
    "items": *[_type in ["Concept", "ObjectType", "Actor", "Group"]] | order(label, label.nor){ 
      _id,
      _type,
      label,
      "count": count(*[references(^._id)]),
    },
    ${siteSettings}
  }
`

export const frontpageQuery = `
  {
    "frontpage": *[ _id == "frontpage" ][0] {
      _id,
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
      _id,
      label,
      hasType[]-> {
        ...
      },
      image,	
    }
  }
`

export const idsQuery = `
  *[_type in [...$publicDocumentTypes]] {
    _id
  }
`

export const routesQuery = `
  *[ _type == "Route" ] {
    _id,
    _type,
    slug
  }
`

export const routeQuery = `
  {
    "route": *[ _type == "Route" && slug.current == $joinID ][0] {
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
    },
    ${siteSettings}
  }
`

export const humanMadeObjectsQuery = `{
  "items": *[_type == "HumanMadeObject"] | order(preferredIdentifier){ 
    _id,
    _type,
    label,
    preferredIdentifier,
    hasType[]-> {
      _id,
      label
    },
    image,
    "aspectRatio": image.asset->.metadata.dimensions.aspectRatio,
  },
  ${siteSettings}
}`

export const typeQuery = `
  *[_id == $id][0] {
    _type
  }
`

// Fields
export const humanMadeObjectFields = `
  _id,
  _type,
  depicts[]-> {
    _id,
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
  },
`

export const groupFields = `
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
    _id,
    _type,
    label
  },
  "mentionedIn": *[_type in ["HumanMadeObject"] && references(^._id)]{ 
    _id,
    _type,
    label,
    image
  }
`

export const pageFields = `
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
`