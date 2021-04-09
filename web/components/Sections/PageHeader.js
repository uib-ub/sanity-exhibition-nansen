import {imageBuilder} from '../../lib/sanity'
import {Center, Container, Grid, Box, Heading, Image, Text} from '@chakra-ui/react'
import {useColorModeValue} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function PageHeader(props) {
  if(!props || props.disabled === true) {
    return null
  }

  const color = useColorModeValue(props.palette?.darkVibrant?.foreground ?? 'white', props.palette?.darkMuted?.foreground ?? 'black')
  const bg = useColorModeValue(props.palette?.darkVibrant?.background ?? 'black', props.palette?.darkMuted?.background ?? 'white')
  const height = '50vh'

  const image = props.illustration?.image

  return (
    <Container maxW="3xl" mt="5">
      <Heading 
        fontSize={["2xl", "4xl", "5xl", "6xl" ]}
        w="100%" 
        textTransform="uppercase"
      >
        {props.title}
      </Heading>
      
      {props?.subtitle && (
        <PortableTextBlock blocks={props.subtitle} />
      )}
    </Container>
  )
}

    {/* <Grid
      mb="10"
      maxW="6xl"
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
          fontSize={["2xl", "4xl", "5xl", "6xl" ]}
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
          src={imageBuilder.image(image).width('1000').height('1000').url()}
          alt={''}
        />
      )}
    </Grid> */}