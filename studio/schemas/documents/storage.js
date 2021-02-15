import {FaBox} from 'react-icons/fa'
import {
  timespan,
  editorialState,
  accessState,
  label,
  referredToBy,
  tookPlaceAt,
  preferredIdentifier,
  identifiedBy,
} from '../props'
import {defaultFieldsets} from '../fieldsets'

export default {
  name: 'Storage',
  type: 'document',
  title: 'Storage',
  description: 'Storage is a subclass of place.',
  initialValue: {
    editorialState: 'published',
    accessState: 'secret',
  },
  icon: FaBox,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    preferredIdentifier,
    label,
    identifiedBy,
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'reference',
      to: [{type: 'StorageType'}],
      validation: (Rule) => Rule.required(),
    },
    referredToBy,
    timespan,
    {
      name: 'location',
      title: 'Lokasjon',
      titleEN: 'Location',
      type: 'geopoint',
    },
    tookPlaceAt,
    {
      name: 'consistsOf',
      title: 'Består av',
      titleEN: 'consistsOf',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'Storage'}, 
            {type: 'HumanMadeObject'}, 
            {type: 'Collection'}
          ],
        },
      ],
      options: {
        editModal: 'fullscreen',
      },
    },
  ],
  preview: {
    select: {
      type: 'hasType.0.label.nor',
      title: 'label.nor',
    },
    prepare(selection) {
      const {title, type} = selection

      return {
        title: title,
        subtitle: type,
      }
    },
  },
}
