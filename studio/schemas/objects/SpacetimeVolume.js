import {definedByGeoJSON} from '../props'

export default {
  name: 'SpacetimeVolume',
  title: 'Spacetime volume',
  type: 'object',
  description:
    'Comprises of 4 dimensional point sets (volumes) in physical spacetime regardless its true geometric form. Example: the spatio-temporal trajectory of the H.M.S. Victory from its building to its actual location.',
  descriptionEN:
    'Comprises of 4 dimensional point sets (volumes) in physical spacetime regardless its true geometric form. Example: the spatio-temporal trajectory of the H.M.S. Victory from its building to its actual location.',
  fields: [
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      description: 'A shortish description',
      type: 'LocaleBlockSimple',
    },
    {
      name: 'temporalProjection',
      title: 'Tidsspenn',
      titleEN: 'Timespan',
      type: 'array',
      of: [{type: 'Timespan'}],
    },
    {
      name: 'spatialProjection',
      title: 'Fant sted ved',
      titleEN: 'Took place at',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'Place'}]}],
    },
    {
      name: 'hadPresence',
      title: 'Hadde tilstedeværelse',
      titleEN: 'Had presence',
      type: 'array',
      of: [{type: 'Presence'}],
    },
    definedByGeoJSON,
  ],
  preview: {
    select: {
      type: 'type',
    },
    prepare(selection) {
      const {type} = selection
      return {
        title: type,
      }
    },
  },
}
