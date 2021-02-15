import {referredToBy} from '../props'
import {defaultFieldsets} from '../fieldsets'

export default {
  name: 'Identifier',
  type: 'object',
  title: 'Identifikator',
  titleEN: 'Identifier',
  fieldsets: defaultFieldsets,
  fields: [
    {
      name: 'content',
      title: 'Identifikator',
      titleEN: 'Identifier',
      type: 'string',
    },
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'reference',
      to: [{type: 'IdentifierType'}],
      validation: (Rule) => Rule.required(),
    },
    referredToBy,
  ],
  preview: {
    select: {
      title: 'content',
      type: 'hasType.label.nor',
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
