import {timespan, tookPlaceAt, referredToBy, motivatedBy, featured} from '../../props'
import {defaultFieldsets} from '../../fieldsets'

var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent group

export default {
  name: 'Formation',
  type: 'object',
  title: 'Opprettelse',
  titleEN: 'Formation',
  fieldsets: defaultFieldsets,
  fields: [
    featured,
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'EventType'}],
        },
      ],
    },
    {
      name: 'formedFrom',
      title: 'Opprettet fra',
      titleEN: 'Formed from',
      type: 'array',
      of: [
        {
          type: 'reference', 
          to: [
            {type: 'Group'}
          ]
        }
      ],
    },
    timespan,
    tookPlaceAt,
    motivatedBy,
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
    },
    prepare(selection) {
      const {type} = selection
      return {
        title: `${capitalize(type)}`,
      }
    },
  },
}
