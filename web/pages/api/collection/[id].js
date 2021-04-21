import {sanityClient, previewClient} from '../../../lib/sanity.server'
const getClient = (preview) => (preview ? previewClient : sanityClient)

/* 
  Construct a IIIF Presentation v3 collection json
*/
const constructCollection = async (data) => {
  if(!data) {
    throw new Error('No input')
  }

  const collection = {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    ...data
  }
  return collection
}

export default async function handler(req, res) {
  const {
    method,
    "query": id
  } = req
  const preview = false

  async function getObject(preview = false) {
    const results = await getClient(id, preview).fetch(`
      *[_id == $id][0] {
        "id": "http://localhost:3000/api/collection/" + _id,
        "type": "Collection",
        label,
        "items":*[_type == "HumanMadeObject" && ^._id in hasCurrentOwner[]._ref] {
          "id": coalesce(subjectOfManifest, "http://localhost:3000/api/manifest/" + _id),
          "type": "Manifest",
          label
        }                
      }`,
      id
    )
    return results
  }
  
  switch (method) {
    case 'GET':
      const results = getObject(id, preview)
      const object = await results
      const constructedManifest = constructCollection(object)
      const manifest = await constructedManifest

      console.log('Collection served')
      res.status(200).json(manifest)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
