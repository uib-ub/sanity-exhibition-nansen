import { imageBuilder } from '../../lib/sanity'
import { Container, Divider, Box, Heading, Image, Badge } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import PortableTextBlock from '../PT/PortableTextBlock'

export default function Hero(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const bg = useColorModeValue('gray.800', 'gray.300')
  const color = useColorModeValue('white', 'gray.800')
  const height = '70vh'

  const image = props.illustration.image

  return (
    <>
      <Box borderColor="gray.800" borderWidth="20px" mb="2" mt="4">
        <Image
          objectFit="cover"
          objectPosition="50% 50%"
          minH="55vh"
          maxH={height}
          width="100%"
          justifyContent="flex-end"
          overflow="hidden"
          src={imageBuilder.image(image).height(1000).width(2000).url()}
          alt={''}
        />
      </Box>
      <Container
        maxW="full"
        d="flex"
        /* color={color} */
        zIndex="1"
        centerContent
      >
        {props.label && (
          <Badge backgroundColor={bg} color={color}>
            {props.label}
          </Badge>
        )}

        <Heading fontSize={['xl', '4xl', '4xl', '6xl']} textTransform="uppercase">
          {props.title}
        </Heading>

        {props?.tagline && (
          <Box>
            <PortableTextBlock fontSize={['2xl', '3xl']} blocks={props.tagline} />
          </Box>
        )}
      </Container>

      <Divider opacity="1" mb="6" />
    </>
  )
}
