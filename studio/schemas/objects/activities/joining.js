import {timespan, referredToBy, tookPlaceAt} from '../../props'

var capitalize = require('capitalize')

export default {
  name: 'Joining',
  type: 'object',
  title: 'Innlemmelse',
  titleEN: 'Joining',
  fieldsets: [
    {
      name: 'minimum',
      title: 'Minimumsregistrering',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
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
      name: 'joinedBy',
      title: 'Innlemmet',
      titleEN: 'Joined',
      description: 'Actor(s) that joined this group',
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
      date: 'timespan.0.date',
    },
    prepare(selection) {
      const {type, date} = selection
      return {
        title: `${capitalize(type)}${date ? ' at ' + date : ''}`,
      }
    },
  },
}
