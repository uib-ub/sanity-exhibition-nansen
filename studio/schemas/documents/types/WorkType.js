import {FaTag} from 'react-icons/fa'
import {editorialState, accessState, label, altLabel} from '../../props'
import {defaultFieldsets} from '../../fieldsets'
import {coalesceLabel} from '../../helpers/helpers'

export default {
  name: 'WorkType',
  title: 'Verkstype',
  type: 'document',
  initialValue: {
    editorialState: 'published',
    accessState: 'open',
  },
  icon: FaTag,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    label,
    altLabel,
    {
      name: 'broader',
      title: 'Overordnet term',
      titleEN: 'Broader',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'WorkType'}]}],
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
      broader: 'broader.0.label.nor',
    },
    prepare(selection) {
      const {title, broader} = selection
      return {
        title: coalesceLabel(title),
        subtitle: broader ? `⬆️` + broader : '🔝 Toppkonsept',
      }
    },
  },
}
