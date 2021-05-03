import {nanoid} from 'nanoid'
import sanityClient from 'part:@sanity/base/client'
import { mapMediatypes } from '../../shared/mapMediatypes'
import { getImageBlob, patchAssetMeta, setAssetRef } from '../../shared/storeFunctions'

const client = sanityClient.withConfig({apiVersion: '2021-03-25'})

export const chooseItem = async (item) => {
  // Get a 200x200px thumbnail. Maybe change to a bigger size based on thumbnail_custom.
  const imageUrl = item._links.thumbnail_custom.href

  function customImageSize(image, h, w) {
    if (!image) {
      console.error('No image input')
      throw Error
    }
    const height = '600' || h
    const width = '600' || w
    const template = image.replace('{height}', height).replace('{width}', width)
    return template
  }

  const types = mapMediatypes(item.metadata.mediaTypes)

  const doc = {
    _type: 'HumanMadeObject',
    _id: `${item.id}`,
    accessState: 'open',
    editorialState: 'published',
    license:
      item.accessInfo && item.accessInfo.isPublicDomain
        ? 'https://creativecommons.org/publicdomain/mark/1.0/'
        : 'https://rightsstatements.org/vocab/CNE/1.0/',
    label: item.metadata.title,
    preferredIdentifier: item.id,
    homepage: `https://urn.nb.no/${item.metadata.identifiers.urn}`,
    identifiedBy: [
      {
        _type: 'Identifier',
        _key: nanoid(),
        content: item.id,
        hasType: {
          _type: 'reference',
          _key: nanoid(),
          _ref: 'de22df48-e3e7-47f2-9d29-cae1b5e4d728',
        },
      },
    ],
    hasCurrentOwner: [
      {
        _type: 'reference',
        _key: nanoid(),
        _ref: '37f7376a-c635-420b-8ec6-ec0fd4c4a55c',
      },
    ],
    subjectOfManifest: item._links.presentation.href,
    hasType: types,
    wasOutputOf: {
      _type: 'DataTransferEvent',
      _key: nanoid(),
      /* _ref: nanoid(36), <- uncomment if changed to a document in schema */
      transferred: {
        _type: 'DigitalObject',
        _key: nanoid(),
        /* _ref: item.id, */
        value: `"${JSON.stringify(item, null, 0)}"`,
      },
      timestamp: new Date(),
      hasSender: {
        _type: 'DigitalDevice',
        _key: nanoid(),
        /* _ref: nanoid(36), */
        label: 'api.nb.no',
      },
    },
  }

  /* TODO
    Important to include iiif manifest in asset metadata as the asset could be reused else where in the dataset */
  const assetMeta = {
    source: {
      // The source this image is from
      name: 'nb.no',
      url: item._links.presentation.href,
      // A string that uniquely idenitfies it within the source.
      // In this example the URL is the closest thing we have as an actual ID.
      id: item.id,
    },
    description: item.metadata.title,
    creditLine: 'From nb.no',
  }

  const createDoc = async (doc) => {
    const res = client.createOrReplace(doc).then((result) => {
      console.log(`${result._id} was imported!`)
      return result
    })
    return res
  }

  try {
    const imageResonse = await getImageBlob(customImageSize(imageUrl))
    const asset = await uploadImageBlob(imageResonse)
    await patchAssetMeta(asset._id, assetMeta)

    const document = await createDoc(doc)
    if (asset && document) {
      await setAssetRef(document._id, asset._id)
    }

    return {
      success: true,
      body: JSON.stringify(document, asset),
    }
  } catch (err) {
    return {
      success: false,
      body: JSON.stringify(response.status, response.statusText),
    }
  }
}
