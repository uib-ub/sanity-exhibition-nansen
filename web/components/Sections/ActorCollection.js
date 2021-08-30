import { Box, Heading, Image } from '@chakra-ui/react'
import { imageBuilder } from '../../lib/sanity'
import PortableTextBlock from '../PortableTextBlock'

export default function ActorCollection(props) {
  return (
    <Box maxW={['lg', null, null, '2xl']}>
      <Heading fontSize={['xl', '2xl', '3xl', '3xl']}>{props.title}</Heading>
      <PortableTextBlock blocks={props.description} />
      {props?.items?.map((item) => (
        <Box key={item._id} id={item._id}>
          {item.image && (
            <Image
              src={imageBuilder.image(item.image).height(200).url()}
              alt={item.label || 'No label'}
            />
          )}
          <Heading fontSize={['lg', 'xl', '2xl', null]}>{item.label}</Heading>
          <PortableTextBlock blocks={item.description} />
        </Box>
      ))}
    </Box>
  )
}
