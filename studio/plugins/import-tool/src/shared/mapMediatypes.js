import {nanoid} from 'nanoid'

export const mapMediatypes = (types) => {
  let mappedTypes = []

  types.map((type) => {
    switch (type) {
      case 'ubbont:Painting':
        mappedTypes.push({
          _ref: 'cc652425-39e2-4c56-9b0f-c570d4f979bf',
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'ubbont:Photograph':
        mappedTypes.push({
          _ref: 'c8791a86-bdaa-407f-bcda-3e84c05d0750',
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'bibo:Manuscript':
        mappedTypes.push({
          _ref: '7f0864c0-82e7-4a05-b7e0-b1dc15f3fe6f',
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'bøker':
        mappedTypes.push({
          _ref: '9c8240d2-23b6-45f4-8501-bc2723fbf75e',
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'bilder':
        mappedTypes.push({
          _ref: 'c076b082-3c29-47ee-bd0a-9dee05269a47',
          _type: 'reference',
          _key: nanoid(),
        })
        break
      case 'privatarkivmateriale':
        mappedTypes.push({
          _ref: 'c7f0864c0-82e7-4a05-b7e0-b1dc15f3fe6f',
          _type: 'reference',
          _key: nanoid(),
        })
        break
      default:
        break
    }
  })

  return mappedTypes
}
