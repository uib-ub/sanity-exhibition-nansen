import { Container, Heading, Image } from '@chakra-ui/react'
import PortableTextBlock from '../PT/PortableTextBlock'

export default function PageHeader(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Container centerContent pt="10" mb={['2', '8']} maxW="4xl">
      <Heading fontSize={['2xl', '3xl', '4xl', '5xl']} textTransform="uppercase" mb="">
        {props.title}
      </Heading>

      {props?.subtitle && <PortableTextBlock blocks={props.subtitle} />}

      <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/img/taakeheimen-border.svg`} alt="" />
    </Container>
  )
}
