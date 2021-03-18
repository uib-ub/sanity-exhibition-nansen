import {imageBuilder} from '../../lib/sanity'
import {Center, Container, Grid, Box, Heading, Image} from '@chakra-ui/react'
import {useColorMode, useColorModeValue} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function PageHeader(props) {
  const {colorMode, toggleColorMode} = useColorMode()

  const color = useColorModeValue('black', 'white')
  const bg = useColorModeValue('gray.100', 'gray.800')
  const opacity = useColorModeValue('0.7', '0.4')
  const height = '60vh'

  if (!props) {
    return null
  }
  const image = props.illustration?.image

  return (
    <Grid
      maxW="full"
      gridTemplateAreas='"hero"' 
      h={height} 
      backgroundColor={bg}
    >
      <Container 
        gridArea="hero" 
        color={color} 
        maxW="3xl" 
        alignSelf="end" 
        zIndex="1"
        bg={bg}
      >
        <Heading 
          fontSize={["2xl", "4xl", "5xl" ]}
          w="100%" 
          textTransform="uppercase"
        >
          {props.title}
        </Heading>

        {props?.subtitle && (
          <PortableTextBlock blocks={props.subtitle} />
        )}
      </Container>

      {image && (
        <Image
          gridArea="hero"
          objectFit="cover"
          height="100%"
          width="100%"
          justifyContent="end"
          overflow="hidden"
          src={imageBuilder.image(image).width('1000').height('300').url()}
          alt={''}
        />
      )}
    </Grid>
  )
}
