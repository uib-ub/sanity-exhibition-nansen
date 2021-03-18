import {imageBuilder} from '../../lib/sanity'
import {Image} from '@chakra-ui/react'

export default function ItemImage({label, url, id}) {
  return (
    <Image w="full" m="auto" objectFit="scale-down" objectPosition="center" src={imageBuilder.image(url).fit('fill').url()} alt={label}/>
  )
}
