export default {
  name: 'SingleObject',
  type: 'object',
  title: 'Single object',
  fields: [
    {
      name: 'view',
      title: 'Visningsvalg',
      titleEN: 'View choice',
      description: 'Velg enkeltside-visning eller galleri med alle objektets bilder. Bokvisning er standard.',
      type: 'string',
      options: {
        list: [
          {title: 'Book', value: 'book'},
          {title: 'Single', value: 'single'},
          {title: 'Gallery', value: 'gallery'},
        ],
      },
    },
    {
      name: 'item',
      title: 'Objekt',
      titleEN: 'Item',
      type: 'reference',
      to: [{type: 'HumanMadeObject'}],
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
      title: 'item.label',
      media: 'item.image',
    },
    prepare({title, media}) {
      return {
        title: title,
        subtitle: 'Single Object',
        media: media,
      }
    },
  },
}
