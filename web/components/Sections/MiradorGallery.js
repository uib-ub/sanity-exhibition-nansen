import dynamic from 'next/dynamic'
import {Grid, Container, Box, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../Mirador'), {ssr: false})

export default function MiradorGallery(props) {
  if (!props) {
    return null
  }
  
  const {items} = props

  return (
    <Container maxW={["3xl", "3xl", "3xl", "6xl"]}>
      <Grid
        maxW={["xl", "xl", "xl", "5xl"]}
        my={10}
        gridGap={5}
        alignContent="start"
        gridTemplateAreas={{base: '"image" "metadata"', lg: '"image image metadata"'}}
        gridTemplateColumns={{base: '100%', lg: '6fr 6fr 4fr'}}
      >
        <Box fontFamily="Montserrat" gridArea="metadata">
          <Heading fontSize="sm" mb={1}>
            {props.heading}
          </Heading>

          {props?.description && (
            <Box fontSize="xs" fontWeight="200">
              <PortableTextBlock blocks={props.description} />
            </Box>
          )}
        </Box>

        {items && (
          <Box gridArea="image">
            <MiradorWithNoSSR windows={items} />
          </Box>
        )}
      </Grid>
    </Container>
  )
}
