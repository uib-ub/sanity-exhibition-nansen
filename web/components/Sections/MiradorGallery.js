import dynamic from 'next/dynamic'
import {Grid, Container, Box, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../Mirador'), {ssr: false})

export default function MiradorGallery(props) {
  if (!props) {
    return null
  }
  
  const {items, h} = props

  return (
    <Container maxW={["3xl", "3xl", "3xl", "6xl"]}>
      <Grid
        maxW={["xl", "xl", "xl", "6xl"]}
        my={{base: 5, md: 8, xl: 16}}
        gridGap={5}
        alignContent="start"
        gridTemplateAreas={{base: '"image" "metadata"', lg: '"image metadata"'}}
        gridTemplateColumns={{base: '100%', lg: '10fr 4fr'}}
      >

        {items && (
          <Box gridArea="image">
            <MiradorWithNoSSR windows={items} h={h} workspaceControlPanel={true} />
          </Box>
        )}
       
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
