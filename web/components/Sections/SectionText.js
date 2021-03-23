import {Container, Box, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function SectionText(props) {
  return (
    <Container maxW="3xl">
      <Box maxW="xl">
        {props?.title && (
          <Heading fontSize="xl">{props.title}</Heading>
        )}

        {props?.subtitle && (
          <PortableTextBlock blocks={props.subtitle} />
        )}

        <PortableTextBlock blocks={props.content} />
      </Box>
    </Container>
  )
}
