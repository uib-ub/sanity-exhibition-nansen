import { imageBuilder } from '../../lib/sanity'
import { Grid, Box, Heading, Image, Badge } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import PortableTextBlock from '../PT/PortableTextBlock'

export default function Hero(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const bg = useColorModeValue('gray.800', 'gray.300')
  const color = useColorModeValue('white', 'gray.800')
  const height = '50vh'

  const image = props.illustration.image

  return (
    <Grid
      templateAreas={{ md: '"hero"', base: '"hero" "text"' }}
      templateRows={{ md: 'auto', base: 'auto auto' }}
      maxW="full"
      mb="10"
      h={height}
      boxSizing="border-box"
    >
      <Box
        gridArea={{ md: 'hero', base: 'text' }}
        d="flex"
        color={color}
        p={['0', '0']}
        zIndex="1"
        /* selfalign="center"
        justifyContent="center" */
        alignItems="flex-end"
        placeItems="flex-end"
      >
        <Box
          w={{ base: 'full', md: 'md' }}
          px={['2', '4']}
          pt={['2', '4']}
          /* backgroundColor={bg} */
          sx={{ backdropFilter: 'invert(.2) blur(16px)' }}
        >
          <Badge backgroundColor={bg} color={color}>
            {props.label}
          </Badge>

          <Heading fontSize={['xl', '4xl', '4xl', '6xl']}>{props.title}</Heading>

          {props?.tagline && (
            <Box>
              <PortableTextBlock fontSize={['md', 'xl']} blocks={props.tagline} />
            </Box>
          )}
        </Box>
      </Box>

      <Image
        gridArea="hero"
        objectFit="cover"
        objectPosition="0% 100%"
        h="100%"
        width="100%"
        justifyContent="flex-end"
        overflow="hidden"
        src={imageBuilder.image(image).height(500).width(1000).url()}
        alt={''}
      />
    </Grid>
  )
}
