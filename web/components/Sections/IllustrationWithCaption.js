import {imageBuilder} from '../../lib/sanity'
import {Flex, Grid, Box, Icon, Image, Heading} from '@chakra-ui/react'
import {BsInfoCircle} from 'react-icons/bs'
import PortableTextBlock from '../PortableTextBlock'

export default function IllustrationWithCaption(props) {
  if (!props && !props.illustration) {
    return null
  }
  
  const {title, content, illustration, source} = props

  return (
    <Grid
      h={{xl: '50vh'}}
      maxW={['xl', 'xl', 'xl', '6xl']}
      my={{base: '6', md: '16', xl: '24'}}
      gridGap={5}
      gridTemplateAreas={{base: '"image" "metadata"', xl: '"image metadata"'}}
      gridTemplateColumns={{base: '100%', xl: '10fr 4fr'}}
      gridTemplateRows="1fr auto"
    >
      
      {illustration ? (
        <Box 
          h="50vh" 
          gridArea="image"
          bgColor='gray.200'
        >
          <Image
            h="100%"
            margin="auto"
            src={imageBuilder.image(illustration.image).fit('fill').url()}
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
          <Box>
            <PortableTextBlock 
              fontSize={{base: 'sm', sm: 'sm', md: 'md', xl: 'md'}} 
              fontWeight="200" 
              blocks={content}              
            />
          </Box>
        )}

        {source && (
          <Flex
            color="gray.500" 
            fontSize={{base: 'xs', sm: 'xs', md: 'sm', xl: 'sm'}}
            pb={{base: '2', md: '0'}}
            mb="0"
          >
            <Icon as={BsInfoCircle} mr="2" mt="1"/>
            <PortableTextBlock 
              color="gray.500" 
              fontSize={{base: 'xs', sm: 'xs', md: 'sm', xl: 'sm'}}
              mb="0"
              mx="0"
              blocks={source}
            />
          </Flex>
        )}
      </Box>
    </Grid>
  )
}
