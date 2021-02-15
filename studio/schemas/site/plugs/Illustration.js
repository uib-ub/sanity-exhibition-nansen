export default {
  name: 'Illustration',
  type: 'object',
  title: 'Illustrasjon',
  titleEN: 'Illustration',
  fields: [
    {
      name: 'image',
      title: 'Bilde',
      titleEN: 'Image',
      type: 'DigitalImageObject',
    },
  ],
  preview: {
    select: {
      image: 'image',
    },
    prepare({image}) {
      if (!image) {
        return {title: 'Illustrasjon uten bilde'}
      }
      return {
        title: `Illustrasjon`,
        subtitle: `${
          image.caption || image.alt || 'Mangler bildetekst eller "alt" tekst'
        } | Size: ${image.size || 'default'}`,
        media: image,
      }
    },
  },
}
