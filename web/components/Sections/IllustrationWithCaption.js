import {imageBuilder} from '../../lib/sanity'
import {Grid, Box, Image, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function IllustrationWithCaption(props) {
  if (!props && !props.illustration) {
    return null
  }
  
  const {title, content, illustration} = props

  return (
    <Grid
      h={{xl: "50vh"}}
      maxW={["xl", "xl", "xl", "6xl"]}
      my={{base: "6", md: "16", xl: "24"}}
      gridGap={5}
      gridTemplateAreas={{base: '"image" "metadata"', xl: '"image metadata"'}}
      gridTemplateColumns={{base: '100%', xl: '10fr 4fr'}}
      gridTemplateRows="1fr auto"
    >
      
      {illustration ? (
        <Box h="50vh" gridArea="image">
          <Image
            h="100%"
            width="100%"
            src={imageBuilder.image(illustration.image).fit('crop').height(500).width(1000).url()}
            alt={''}
          />
        </Box>
        ) : (<Flex gridArea="image">Mangler illustrasjon</Flex>)
      }

      <Box fontFamily="Montserrat" gridArea="metadata" pr="10" overflowY={{xl: "scroll"}}>
        <Heading 
          fontFamily="Montserrat" 
          fontWeight="semibold" 
          color="red.600" 
          fontSize={{base: "sm", sm: "sm", md: "md", xl: "xl"}} 
          mb={1}
        >
          {title}
        </Heading>

        {content && (
          <Box>
            <PortableTextBlock 
              fontSize={{base: "sm", sm: "sm", md: "md", xl: "md"}} 
              fontWeight="200" 
              blocks={content}              
            />
          </Box>
        )}
      </Box>
    </Grid>
  )
}
