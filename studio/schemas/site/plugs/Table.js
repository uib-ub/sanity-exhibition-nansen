export default {
  type: 'object',
  name: 'Table',
  title: 'Tabell',
  titleEN: 'Table',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'data',
      title: 'Illustrasjonsbilde',
      titleEN: 'Illustration',
      type: 'table',
    },
    {
      name: 'caption',
      title: 'Tekst',
      titleEN: 'Text',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'title',
      disabled: 'disabled',
    },
    prepare({ title, disabled }) {
      return {
        title: title,
        subtitle: `${disabled ? 'Avslått: ' : ''}Tabell`,
      }
    },
  },
}
