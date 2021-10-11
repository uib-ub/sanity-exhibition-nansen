import { Container, Heading } from '@chakra-ui/react'
import PortableTextBlock from '../PT/PortableTextBlock'

export default function SectionText(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Container maxW={['md', null, '2xl', null]}>
      {props?.title && <Heading fontSize="xl">{props.title}</Heading>}

      {props?.subtitle && <PortableTextBlock blocks={props.subtitle} />}

      <PortableTextBlock blocks={props.content} />
    </Container>
  )
}
