import dynamic from 'next/dynamic'
import {Grid, Box, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../MiradorViewer'), {ssr: false})

export default function MiradorGallery(props) {
  if (!props && !props.items) {
    return null
  }
  
  const {items} = props
  
  return (
    <Grid
      maxW={['xl', 'xl', 'xl', '6xl']}
      my={{base: '6', md: '16', xl: '20'}}
      gridGap={5}
      gridTemplateAreas={{base: '"image" "metadata"', xl: '"image metadata"'}}
      gridTemplateColumns={{base: '100%', xl: '10fr 4fr'}}
      gridTemplateRows="1fr auto"
    >

      {items ? 
        (<MiradorWithNoSSR
          gridArea="image"
          variant="standard"
          manifests={items} 
        />) :
        (<Flex gridArea="image">Mangler manifest</Flex>)
      }
      
      <Box fontFamily="Montserrat" gridArea="metadata" pr="10">
        <Heading fontFamily="Montserrat" fontWeight="semibold" color="red.600" fontSize={{base: 'sm', sm: 'sm', md: 'md', xl: 'xl'}} mb={1}>
          {props.title}
        </Heading>

        {props?.description && (
          <PortableTextBlock 
            fontSize={{base: 'sm', sm: 'sm', md: 'sm', xl: 'md'}} 
            fontWeight="200"
            mx="0"
            blocks={props.description} />
        )}
      </Box>
    </Grid>
  )
}
