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
    id: `https://example.org/iiif/37f7376a-c635-420b-8ec6-ec0fd4c4a55c/collection`,
    type: "Collection",
    label: { "none": [ "Universitetsbiblioteket i Bergens Nansensamling" ] },
    requiredStatement: {
      label: { 
        no: [ "Kreditering" ],
        en: [ "Attribution" ] 
      },
      value: { 
        no: [ "Tilgjengeliggjort av Universitetsbiblioteket i Bergen" ],
        en: [ "Provided by University of Bergen Library" ] 
      }
    },
    items: [
      ...data
    ],
  }
  return collection
}

export default async function handler(req, res) {
  const {
    method,
  } = req
  const preview = false

  /* 
    Change the query to fit you data :-)
  */
  async function getObject(preview = false) {
    const results = await getClient(preview).fetch(
      `*[_type == "Group" && count(*[_type == "HumanMadeObject" && references(^._id)]) > 0] {
        "id": "http://localhost:3000/api/collection/" + _id,
        "type": "Collection",
        label               
      }`
    )
    return results
  }
  
  switch (method) {
    case 'GET':
      const results = getObject(preview)
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
