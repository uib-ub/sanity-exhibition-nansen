export default {
  name: 'SingleObject',
  type: 'object',
  title: 'Single object',
  fields: [
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
