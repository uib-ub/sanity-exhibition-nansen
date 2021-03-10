import React from 'react'
import dynamic from 'next/dynamic'
import {Grid, Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../Mirador'), {ssr: false})
const CanvasPanelFullScreedWithNoSSR = dynamic(() => import('../CanvasPanelFullScreen'), {ssr: false})

export default function SingleObject(props) {
  if (!props) {
    return null
  }
  const ref = React.createRef();

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
          <Heading fontFamily="Montserrat" fontSize="sm" mb={1}>
            {props.title}
          </Heading>

          {props?.description && (
            <Box fontSize="xs" fontWeight="200">
              <PortableTextBlock blocks={props.description} />
            </Box>
          )}
        </Box>

        {props?.item.manifest && (
          <Box gridArea="image">
            {/* <MiradorWithNoSSR manifest={[props.item.manifest]} /> */}
            <CanvasPanelFullScreedWithNoSSR ref={ref} manifest={[props.item.manifest]} />
          </Box>
        )}
      </Grid>
    </Container>
  )
}
