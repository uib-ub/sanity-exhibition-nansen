import {FaUser} from 'react-icons/fa'
import {
  editorialState,
  accessState,
  referredToBy,
  labelSingleton,
  identifiedBy,
  memberOf,
  image,
  wasOutputOf,
  inDataset,
} from '../props'
import {coalesceLabel, timespanAsString} from '../helpers/helpers'

export default {
  name: 'Actor',
  title: 'Actor',
  type: 'document',
  initialValue: {
    editorialState: 'draft',
    accessState: 'secret',
  },
  icon: FaUser,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'minimum',
      title: 'Basic metadata',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'representation',
      title: 'Hovedbilde og IIIF manifest',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'relations',
      title: 'Relations to other stuff',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    {
      ...identifiedBy,
      fieldset: 'minimum',
    },
    {
      ...referredToBy,
      fieldset: 'minimum',
    },
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      fieldset: 'minimum',
      of: [
        {
          type: 'reference',
          to: [{type: 'ActorType'}],
        },
      ],
      validation: Rule => Rule.min(1).warning('Du bør ha "Person" eller "Gruppe" som første type!'),
    },
    {
      ...image,
      fieldset: 'representation',
    },
    memberOf,
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description:
        'En aktivitetsstrøm samler alle hendelser knyttet til denne aktøren. Fødsel og død er "inline" til personen, mens andre aktiviteter som ekteskap er egne dokument.',
      descriptionEN: 'Add all known events this smuck did',
      type: 'array',
      of: [
        {type: 'Birth'},
        {type: 'reference', to: [{type: 'Activity'}, {type: 'Event'}]},
        {type: 'Move'},
        {type: 'Joining'},
        {type: 'Leaving'},
        {type: 'Death'},
      ],
      options: {
        editModal: 'fullscreen',
      },
    },
    inDataset,
    wasOutputOf
  ],
  preview: {
    select: {
      title: 'label',
      type: 'hasType.0.label',
      bb: 'activityStream.0.timespan.0.beginOfTheBegin',
      eb: 'activityStream.0.timespan.0.endOfTheBegin',
      date: 'activityStream.0.timespan.0.date',
      be: 'activityStream.0.timespan.0.beginOfTheEnd',
      ee: 'activityStream.0.timespan.0.endOfTheEnd',
      media: 'image',
      imported: 'wasOutputOf'
    },
    prepare(selection) {
      const {title, type, media, imported, bb, eb, date, be, ee} = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
      const wasImported = imported ? `Importert fra ${imported.hasSender.label}` : ''

      return {
        title: title,
        subtitle: `${type ? coalesceLabel(type, 'nor') + '. ' : ''}${timespan ? 'Født: ' + timespan : ''} ${wasImported}`,
        media: media,
      }
    },
  },
}
