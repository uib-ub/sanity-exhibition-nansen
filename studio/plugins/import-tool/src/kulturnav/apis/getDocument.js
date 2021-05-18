import {nanoid} from 'nanoid'
import { mapLanguage } from '../../shared/mapLanguage'
import { mapTypes } from '../../shared/mapTypes'

const getLabel = (item) => {
  return {
    label: {
      _type: "LocaleString",
      ...item.caption ?? '',
      ...item.properties['entity.name'][0]?.value ?? ''
    }
  }
}

const getDescription = (desc) => {
  const arr = []

  desc.forEach(([k, v]) => (
    arr.push({
      _key: nanoid(),
      _type: 'LinguisticObject',
      accessState: 'open',
      editorialState: 'published',
      body: [
        {
          _type: 'block',
          _key: nanoid(),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: nanoid(),
              text: v,
              marks: [],
            },
          ],
        },
      ],
      hasType: [
        {
          _key: nanoid(),
          _ref: 'cad752ea-0888-415a-a691-9d5b92577389',
          _type: 'reference',
        },
      ],
      language: {
        _key: nanoid(),
        _ref: mapLanguage(k),
        _type: 'reference',
      },
    })
  ))
  return arr
}

export const getDocument = (item) => {
  console.log(item)
  const source = 'Kulturnav'
  const timestamp = new Date()
  const desc = item.properties['entity.description']?.[0]?.value ? Object.entries(item.properties['entity.description'][0].value) : {}

  const doc = {
    _type: item.entityType == 'Concept' ? 'Concept' : 'Actor',
    _id: item.uuid,
    accessState: 'open',
    editorialState: 'published',
    ...getLabel(item),
    // preferredIdentifier: item.uuid,
    homepage: `https://kulturnav.org/${item.uuid}`,
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
    ...(item.properties['entity.description'] && {
      referredToBy: [
        ...getDescription(desc)
      ]
    }),
    ...(item.entityType != 'Concept' && {hasType: mapTypes([item.entityType])}),
    // Which dataset does this belongs?
    ...(item.properties['entity.dataset'] && {
      inDataset: {
        _type: 'Dataset',
        _key: nanoid(),
        label: {
          _type: "LocaleString",
          ...item.properties['entity.dataset'][0].displayValue
        },
        preferredIdentifier: item.properties['entity.dataset'][0].value,
        homepage: `https://kulturnav.org/${item.properties['entity.dataset'][0].value}`
      }
    }),
    wasOutputOf: {
      _type: 'DataTransferEvent',
      _key: nanoid(),
      // _ref: nanoid(36), <- uncomment if changed to a document in schema
      label: `Transferred from ${source} at ${timestamp}`,
      timestamp: timestamp,
      transferred: {
        _type: 'DigitalObject',
        _key: nanoid(),
        // _ref: item.id,
        value: `"${JSON.stringify(item, null, 2)}"`,
      },
      hasSender: {
        _type: 'DigitalDevice',
        _key: nanoid(),
        // _ref: nanoid(36),
        label: 'https://kulturnav.org/api',
      },
    },
  }

  return doc
}