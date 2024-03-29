import { Container, Heading, /* Image, */ useColorModeValue } from '@chakra-ui/react'
// import { imageBuilder } from '../../lib/sanity'

import PortableTextBlock from '../PT/PortableTextBlock'

export default function PageHeader(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const border = useColorModeValue(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/img/taakeheimen-border/light.svg`,
    `${process.env.NEXT_PUBLIC_BASE_PATH}/img/taakeheimen-border/dark.svg`,
  )

  return (
    <Container
      centerContent
      pt="10"
      pb={['12', null, '14', null]}
      mb={['4', null, '8', null]}
      maxW={['90vw', '90vw', '2xl', '3xl']}
      backgroundImage={`url('${border}')`}
      backgroundPosition="40% 100%"
      backgroundRepeat="no-repeat"
    >
      {/* {props.illustration?.image && (
        <Image
          mb="5"
          maxH="50vh"
          justifyContent="end"
          overflow="hidden"
          src={imageBuilder.image(props.illustration?.image).width('800').fit('min').url()}
          alt={''}
        />
      )} */}
      <Heading
        fontSize={['2xl', '3xl', '4xl', '5xl', null]}
        textAlign="center"
        textTransform="uppercase"
      >
        {props.title}
      </Heading>
      {props?.subtitle && <PortableTextBlock textAlign="center" blocks={props.subtitle} />}
    </Container>
  )
}
