import {nanoid} from 'nanoid'
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({apiVersion: '2021-03-25'})

export const chooseItem = async (item) => {
  const doc = {
    _type: 'Concept',
    _id: `${item.uuid}`,
    accessState: 'open',
    editorialState: 'published',
    label: {
      ...(item.caption.no ? {
        nor: item.caption.no
      } : null),
      ...(item.caption.sv ? {
        swe: item.caption.sv
      } : null)
    },
    /* preferredIdentifier: item.uuid,
    identifiedBy: [
      {
        _type: 'Identifier',
        _key: nanoid(),
        content: item.uuid,
        hasType: {
          _type: 'reference',
          _key: nanoid(),
          _ref: 'de22df48-e3e7-47f2-9d29-cae1b5e4d728',
        },
      },
    ], */
    /* hasType: types, */
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
        label: 'kulturnav.no/api',
      },
    },
  }

  /* TODO
    Important to include iiif manifest in asset metadata as the asset could be reused else where in the dataset */
  /* const assetMeta = {
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
  } */

  const createDoc = async (doc) => {
    const transaction = client.transaction()
  
    transaction.createOrReplace(doc)
    
    transaction
      .commit()
      .then((res) => {
        console.log(JSON.stringify(res, null, 2))
        return res
      })
      .catch((err) => {
        console.log('Transaction failed', err)
        return err
      })
  }

  try {
    /* const imageResonse = await getImageBlob(customImageSize(imageUrl))
    const asset = await uploadImageBlob(imageResonse)
    await patchAssetMeta(asset._id, assetMeta) */

    await createDoc(doc)
    /* if (asset && document) {
      await setAssetRef(document._id, asset._id)
    } */

    return {
      success: true,
    }
  } catch (err) {
    return {
      success: false,
    }
  }
}
