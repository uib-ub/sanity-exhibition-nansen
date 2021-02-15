export default {
  name: 'ImageCompare',
  type: 'object',
  title: 'Compare images',
  fields: [
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'LocaleString',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'before',
      title: 'Before',
      type: 'array',
      of: [{
        type: 'DigitalImageObject'}, 
        {
          type: 'reference', 
          to: [{
            type: 'HumanMadeObject'}
          ]
      }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'after',
      title: 'After',
      type: 'array',
      of: [{
        type: 'DigitalImageObject'}, 
        {
          type: 'reference', 
          to: [{
            type: 'HumanMadeObject'}
          ]
      }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Bildetekst',
      titleEN: 'Caption',
      type: 'LocaleString',
    },
  ],
  preview: {
    select: {
      title: 'label.nor',
    },
  },
}
