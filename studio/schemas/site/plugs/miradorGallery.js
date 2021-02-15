export default {
  name: 'MiradorGallery',
  type: 'object',
  title: 'Mirador galleri',
  titleEN: 'Mirador gallery',
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'items',
      title: 'Vinduer',
      titleEN: 'Items',
      type: 'array',
      of: [{type: 'MiradorGalleryWindow'}],
    },
    {
      name: 'heading',
      title: 'Tittel',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({title}) => ({
      title: title,
      subtitle: `Mirador galleri`,
    }),
  },
}
