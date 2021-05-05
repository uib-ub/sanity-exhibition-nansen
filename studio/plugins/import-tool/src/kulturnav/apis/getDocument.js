import {nanoid} from 'nanoid'
import { mapMediatypes } from '../../shared/mapMediatypes'

export const getDocument = (item) => {
  console.log(item)

  const getLabel = (type, caption) => {
    if(type == 'Concept') {
      return {
        label: {
          ...(item.caption.no ? {
            nor: item.caption.no
          } : null),
          ...(item.caption.sv ? {
            swe: item.caption.sv
          } : null)
        }
      }
    }
    if(type == 'Person'){
      return { 
        label:  item.properties['entity.name'][0].value.no ?? item.properties['entity.name'][0].value.sv
      }
    }
    else {
      return { 
        label:  caption.no ?? caption.sv
      }
    }
  }


  const doc = {
    _type: 'Actor',
    _id: `${item.uuid}`,
    accessState: 'open',
    editorialState: 'published',
    ...getLabel(item.entityType, item.caption),
    /* preferredIdentifier: item.uuid, */
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
    ],
    hasType: mapMediatypes(item.entityType),
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

  return doc
}