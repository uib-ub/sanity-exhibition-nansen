import {imageBuilder} from '../../lib/sanity'
import {Grid, Box, Image, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function IllustrationWithCaption(props) {
  if (!props && !props.illustration) {
    return null
  }
  
  const {title, content, illustration, source} = props

  return (
    <Grid
      maxW={['sm', 'sm', 'xl', '6xl']}
      my={{base: '6', md: '16', xl: '24'}}
      gridGap={5}
      gridTemplateAreas={{base: '"image" "metadata"', xl: '"image metadata"'}}
      gridTemplateColumns={{base: '100%', xl: '10fr 4fr'}}
      gridTemplateRows="1fr auto"
    >
      
      {illustration ? (
        <Box 
          maxH="50vh" 
          w="100%"
          gridArea="image"
          bgColor='gray.200'
        >
          <Image
            h="auto"
            margin="auto"
            src={imageBuilder.image(illustration.image).fit('fillmax').url()}
            alt={''}
          />
        </Box>
      ) : (<Flex gridArea="image">Mangler illustrasjon</Flex>)
      }

      <Box fontFamily="Montserrat" gridArea="metadata" pr="10" overflowY={{xl: 'scroll'}}>
        <Heading 
          fontFamily="Montserrat" 
          fontWeight="semibold" 
          color="red.600" 
          fontSize={{base: 'sm', sm: 'sm', md: 'md', xl: 'xl'}} 
          mb={1}
        >
          {title}
        </Heading>

        {content && (
            <PortableTextBlock 
              fontSize={{base: 'sm', sm: 'sm', md: 'md', xl: 'md'}} 
              fontWeight="200"
              mx="inherit"
              blocks={content}              
            />
        )}

        {source && (
          <Text 
            color="gray.500" 
            fontSize={{base: 'xs', sm: 'xs', md: 'sm', xl: 'sm'}}
            pb={{base: '2', md: '0'}}
            mb="0"
          >
            <Icon as={BsInfoCircle} mr="2" />

            {source}
          </Text>
        )}
      </Box>
    </Grid>
  )
}
