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

  const getImageBlob = async (url) => {
    // eslint-disable-next-line no-undef
    const response = fetch(url)
      .then((response) => response.body)
      .then((rs) => {
        const reader = rs.getReader()

        // eslint-disable-next-line no-undef
        return new ReadableStream({
          async start(controller) {
            while (true) {
              const {done, value} = await reader.read()

              // When no more data needs to be consumed, break the reading
              if (done) {
                break
              }

              // Enqueue the next data chunk into our target stream
              controller.enqueue(value)
            }

            // Close the stream
            controller.close()
            reader.releaseLock()
          },
        })
      })
      // Create a new response out of the stream
      // eslint-disable-next-line no-undef
      .then((rs) => new Response(rs))
      // Create an object URL for the response
      .then((response) => response.blob())
    return response
  }

  const uploadImageBlob = async (blob) => {
    const res = client.assets
      .upload('image', blob, {contentType: blob.type, filename: `${item.id}`})
      .then((document) => {
        console.log('The image was uploaded!', document)
        return document
      })
      .catch((error) => {
        console.error('Upload failed:', error.message)
      })
    return res
  }

  const patchAssetMeta = async (id, meta) => {
    client
      .patch(id)
      .set(meta)
      .commit()
      .then((document) => {
        console.log('The image was patched!', document)
      })
      .catch((error) => {
        console.error('Patch failed:', error.message)
      })
  }

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

  const setAssetRef = async (docID, assetID) => {
    await client
      .patch(docID)
      .set({
        image: {
          _type: 'DigitalImageObject',
          asset: {
            _type: 'reference',
            _ref: assetID,
          },
        },
      })
      .commit()
      .then((document) => {
        console.log('The asset was hooked up!', document)
      })
      .catch((error) => {
        console.error('Failed:', error.message)
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
