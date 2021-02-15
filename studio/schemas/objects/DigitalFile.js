import {label, license} from '../props'

export default {
  name: 'DigitalFile',
  type: 'file',
  title: 'Fil',
  fields: [
    label,
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'LocaleBlockSimple',
    },
    license,
    {
      name: 'souce',
      title: 'Kilde',
      titleEN: 'Source',
      type: 'url',
    },
  ],
}
