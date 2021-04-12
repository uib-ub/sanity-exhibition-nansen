import dynamic from 'next/dynamic'
import {Grid, Container, Box, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../Mirador'), {ssr: false})

export default function MiradorGallery(props) {
  if (!props && !props.items) {
    return null
  }
  
  const {items, h} = props

  return (
    <Container maxW={["3xl", "3xl", "3xl", "6xl"]} p="0">
      <Grid
        maxW={["xl", "xl", "xl", "6xl"]}
        my={{base: "6", md: "16", xl: "28"}}
        gridGap={5}
        alignContent="start"
        gridTemplateAreas={{base: '"image" "metadata"', xl: '"image metadata"'}}
        gridTemplateColumns={{base: '100%', xl: '10fr 4fr'}}
      >

        <MiradorWithNoSSR
          gridArea="image"
          variant="standard"
          manifests={items} 
          h={h} 
        />
       
        <Box fontFamily="Montserrat" gridArea="metadata" pr="10">
          <Heading fontFamily="Montserrat" fontWeight="semibold" color="red.600" fontSize={{base: "sm", sm: "sm", md: "md", xl: "xl"}} mb={1}>
            {props.title}
          </Heading>

          {props?.description && (
            <PortableTextBlock fontSize={{base: "sm", sm: "sm", md: "sm", xl: "md"}} fontWeight="200" blocks={props.description} />
          )}
        </Box>
      </Grid>
    </Container>
  )
}
