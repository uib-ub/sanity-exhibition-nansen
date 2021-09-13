import { Container, Heading } from '@chakra-ui/react'
import PortableTextBlock from '../PT/PortableTextBlock'

export default function PageHeader(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Container
      centerContent
      pt="10"
      pb="16"
      mb="8"
      maxW="xl"
      backgroundImage={`url('${process.env.NEXT_PUBLIC_BASE_PATH}/img/taakeheimen-border.svg')`}
      backgroundPosition="bottom"
      backgroundRepeat="no-repeat"
    >
      <Heading
        // fontSize={['2xl', '3xl', '4xl', '5xl']}
        textTransform="uppercase"
      >
        {props.title}
      </Heading>

      {props?.subtitle && <PortableTextBlock blocks={props.subtitle} />}
    </Container>
  )
}
