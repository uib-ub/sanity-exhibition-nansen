import Image from 'next/image'
import { Container, Divider, Box, Heading, Badge } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import PortableTextBlock from '../PT/PortableTextBlock'
import { getNextSanityImage } from '../../lib/sanity.server'

export default function Hero(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const bg = useColorModeValue('gray.800', 'gray.300')
  const color = useColorModeValue('white', 'gray.800')

  const image = props.illustration.image

  return (
    <>
      <Box
        borderColor="gray.800"
        borderWidth="20px"
        mb="2"
        mt="4"
        maxW="full"
        h={['50vh', null, null, '65vh', null]}
        position="relative"
      >
        {image && <Image alt="" {...getNextSanityImage(image)} layout="fill" objectFit="cover" />}
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
