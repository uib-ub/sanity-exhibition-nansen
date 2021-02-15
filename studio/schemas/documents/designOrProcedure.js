import {FaClipboard} from 'react-icons/fa'
import {editorialState, accessState, label, referredToBy, identifiedBy} from '../props'
import {defaultFieldsets} from '../fieldsets'
import {coalesceLabel} from '../helpers/helpers'

export default {
  name: 'DesignOrProcedure',
  title: 'Design or procedure',
  type: 'document',
  initialValue: {
    editorialState: 'draft',
    accessState: 'secret',
  },
  icon: FaClipboard,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    label,
    identifiedBy,
    {
      name: 'body',
      title: 'Tekst',
      titleEN: 'Body',
      type: 'LocaleBlock',
    },
    referredToBy,
    {
      name: 'documentedIn',
      title: 'Documented in',
      titleEN: 'Dokumentert i',
      type: 'array',
      of: [{type: 'file'}],
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
