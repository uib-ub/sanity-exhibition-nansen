export default {
  name: 'ActorCollection',
  type: 'object',
  title: 'Actor collection',
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
    /* {
      name: 'title',
      title: 'Tittel eller navn',
      titleEN: 'Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'simpleBlockContent',
    }, */
    {
      name: 'items',
      title: 'Aktører',
      titleEN: 'Items',
      type: 'array',
      validation: (Rule) => Rule.unique(),
      of: [{ type: 'SingleActor' }],
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare: ({ items }) => ({
      title: 'Actor collection',
      subtitle: `${items.length} actor(s)`,
    }),
  },
}
