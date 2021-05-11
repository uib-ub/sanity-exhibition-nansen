import {FaImage} from 'react-icons/fa'
import { coalesceLabel } from '../helpers/helpers'

export default {
  name: 'VisualItem',
  type: 'document',
  title: 'Visual object',
  icon: FaImage,
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'LocaleString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [{type: 'Creation'}],
    },
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: coalesceLabel(title),
      }
    },
  },
}
