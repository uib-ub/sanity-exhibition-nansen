import {FaClipboard} from 'react-icons/fa'
import {editorialState, accessState, label, referredToBy, identifiedBy} from '../props'
import {defaultFieldsets} from '../fieldsets'
import {coalesceLabel} from '../helpers/helpers'

export default {
  name: 'DesignOrProcedure',
  title: 'Design or procedure',
  type: 'document',
  initialValue: {
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: FaClipboard,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    label,
    identifiedBy,
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
      blocks: 'referredToBy.0.body',
    },
    prepare(selection) {
      const {title, blocks} = selection
      const block = (blocks || []).find((block) => block._type === 'block')
      /* TODO add blocks description */
      return {
        title: coalesceLabel(title),
        description: block
        ? block.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
        : 'No description',
      }
    },
  },
}
