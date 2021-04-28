import {editorialState, accessState} from '../props'
import {defaultFieldsets} from '../fieldsets'
import { coalesceLabel } from '../helpers/helpers'

export default {
  name: 'LinguisticObject',
  type: 'object',
  title: 'Tekst',
  titleEN: 'Text',
  fieldsets: defaultFieldsets,
  initialValue: {
    editorialState: 'published',
    accessState: 'open',
  },
  fields: [
    editorialState,
    accessState,
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'TextType'}],
        },
      ],
      /* validation: (Rule) => Rule.required(), */
    },
    {
      name: 'body',
      title: 'Tekst',
      titleEN: 'Body',
      type: 'blockContent',
    },
    {
      name: 'language',
      title: 'Språk',
      titleEN: 'Language',
      type: 'reference',
      to: [{type: 'Language'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'creator',
      title: 'Skaper',
      titleEN: 'Creator',
      description:
        'Registrer en eller flere aktører som har skapt dette dokumentet, gjerne med hvilken rolle de hadde.',
      type: 'array',
      of: [
        {
          type: 'ContributionAssignment',
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Publikasjonsdato',
      titleEN: 'Published at',
      description: 'This can be used to schedule post for publishing',
      type: 'datetime',
    },
    {
      name: 'documentedIn',
      title: 'Dokumentert i',
      titleEN: 'Documented in',
      type: 'array',
      of: [{type: 'file'}],
    },
  ],
  preview: {
    select: {
      title: 'hasType.0.label',
      blocks: 'body',
      lang: 'language.label.nor',
    },
    prepare(selection) {
      const {title, blocks, lang} = selection
      
      return {
        title: blocks?.length
          ? blocks[0].children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'No content',
        subtitle: `${coalesceLabel(title)} ${lang ? 'på ' + lang : ''}`,
      }
    },
  },
}
