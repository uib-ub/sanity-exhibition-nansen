import {timespan, tookPlaceAt, referredToBy, featured} from '../../props'
import {defaultFieldsets} from '../../fieldsets'

var capitalize = require('capitalize')

export default {
  name: 'Leaving',
  type: 'object',
  title: 'Utmeldelse',
  titleEN: 'Leaving',
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
    timespan,
    tookPlaceAt,
    {
      name: 'separatedFrom',
      title: 'Forlot',
      titleEN: 'Left',
      description: 'Actor(s) that left this group',
      type: 'reference', 
      to: [
        {type: 'Group'}
      ]
    },
    {
      name: 'separated',
      title: 'Forlot',
      titleEN: 'Left',
      description: 'Actor(s) that left this group',
      type: 'array',
      of: [
        {
          type: 'reference', 
          to: [
            {type: 'Actor'}, 
            {type: 'Group'}
          ]
        }
      ],
    },
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
      date: 'date',
    },
    prepare(selection) {
      const {type, date} = selection
      return {
        title: `${capitalize(type)}${date ? ' at ' + date : ''}`,
      }
    },
  },
}
