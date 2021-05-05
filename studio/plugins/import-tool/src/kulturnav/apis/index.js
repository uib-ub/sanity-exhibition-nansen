import {nanoid} from 'nanoid'
import sanityClient from 'part:@sanity/base/client'
import { getDocument } from './getDocument'

const client = sanityClient.withConfig({apiVersion: '2021-03-25'})

export const chooseItem = async (item) => {
  const doc = getDocument(item)

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
    console.log(doc)
    if(!doc) return {success: false}

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
