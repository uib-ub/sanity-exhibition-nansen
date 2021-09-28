export default {
  type: 'object',
  name: 'IllustrationWithCaption',
  title: 'Illustrasjon med bildetekst',
  titleEN: 'Illustration with caption',
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
      name: 'content',
      title: 'Tekst',
      titleEN: 'Text',
      type: 'simpleBlockContent',
    },
    {
      name: 'source',
      title: 'Kilde',
      description: 'Legg til kilde eller kreditering',
      titleEN: 'Source',
      type: 'simpleBlockContent',
    },
    {
      name: 'illustration',
      title: 'Illustrasjonsbilde',
      titleEN: 'Illustration',
      type: 'Illustration',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label',
      media: 'illustration',
      disabled: 'disabled',
    },
    prepare({title, media, disabled}) {
      return {
        title: title,
        subtitle: `${disabled ? 'Avslått: ' : ''}Illustrasjon`,
        media: media?.image,
      }
    },
  },
}
