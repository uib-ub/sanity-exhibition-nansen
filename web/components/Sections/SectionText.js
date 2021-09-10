import { Box, Heading } from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function SectionText(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Box maxW={['lg', null, null, null, '2xl']}>
      {props?.title && <Heading fontSize="xl">{props.title}</Heading>}

      {props?.subtitle && <PortableTextBlock blocks={props.subtitle} />}

      <PortableTextBlock blocks={props.content} />
    </Box>
  )
}
