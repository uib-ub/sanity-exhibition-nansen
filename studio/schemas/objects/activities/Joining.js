import {timespan, referredToBy, tookPlaceAt, featured} from '../../props'

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
      name: 'joinedWith',
      title: 'Innlemmet i gruppe',
      titleEN: 'Joined with',
      description: 'Group that actor(s) joined with',
      type: 'reference', 
      to: [
        {type: 'Group'}
      ]
    },
    {
      name: 'joined',
      title: 'Innlemmet aktør(er)',
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
