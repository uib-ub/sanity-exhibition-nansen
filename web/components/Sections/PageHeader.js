import { Container, Heading } from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function PageHeader(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Container centerContent borderBottom="solid 1px" borderColor="gray.300" py="5" mb="8">
      <Heading
        color="gray.700"
        // fontSize={['2xl', '3xl', '4xl', '5xl']}
        textTransform="uppercase"
      >
        {props.title}
      </Heading>

      {props?.subtitle && <PortableTextBlock blocks={props.subtitle} />}
    </Container>
  )
}
