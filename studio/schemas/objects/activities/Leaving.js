import {timespan, tookPlaceAt, referredToBy, featured} from '../../props'
import {defaultFieldsets} from '../../fieldsets'
import { timespanAsString } from '../../helpers/helpers'

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
      joinedWith: 'joinedWith.label',
      bb: 'timespan.0.beginOfTheBegin',
      eb: 'timespan.0.endOfTheBegin',
      date: 'timespan.0.date',
      be: 'timespan.0.beginOfTheEnd',
      ee: 'timespan.0.endOfTheEnd',
    },
    prepare(selection) {
      const {type, joinedWith, bb, eb, date, be, ee} = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
      return {
        title: `${capitalize(type)} ${joinedWith ? joinedWith : ''}`,
        subtitle: `${timespan ? timespan : ''}`,
      }
    },
  },
}
