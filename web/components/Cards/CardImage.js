import { imageBuilder } from '../../lib/sanity'
import { Image } from '@chakra-ui/react'

export default function ItemImage(props) {
  if (!props && props.url) {
    return null
  }

  const { label, url } = props

  return (
    <Image
      w="full"
      m="auto"
      objectFit="scale-down"
      objectPosition="center"
      src={imageBuilder.image(url).fit('fill').url()}
      alt={label ?? ''}
    />
  )
}
