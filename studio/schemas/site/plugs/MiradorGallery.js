export default {
  name: 'MiradorGallery',
  type: 'object',
  title: 'Mirador galleri',
  titleEN: 'Mirador gallery',
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
      name: 'items',
      title: 'Vinduer',
      titleEN: 'Items',
      type: 'array',
      of: [{type: 'MiradorGalleryWindow'}],
    },
    {
      name: 'title',
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
      title: 'title',
      media: 'items.0.manifestRef.image'
    },
    prepare: ({title, media}) => ({
      title: title,
      subtitle: `Mirador galleri`,
      media: media ? media : '' 
    }),
  },
}
