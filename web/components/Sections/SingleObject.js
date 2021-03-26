import React from 'react'
import dynamic from 'next/dynamic'
import {Grid, Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

/* const MiradorWithNoSSR = dynamic(() => import('../Mirador'), {ssr: false}) */
const CanvasPanelFullScreedWithNoSSR = dynamic(() => import('../CanvasPanelFullScreen'), {ssr: false})

export default function SingleObject(props) {
  if (!props && !props.item) {
    return null
  }
  
  const {title, description, item} = props

  const ref = React.createRef();

  return (
    <Container maxW={["3xl", "3xl", "3xl", "6xl"]}>
      <Grid
        maxW={["xl", "xl", "xl", "6xl"]}
        my={10}
        gridGap={5}
        alignContent="start"
        gridTemplateAreas={{base: '"image" "metadata"', lg: '"image metadata"'}}
        gridTemplateColumns={{base: '100%', lg: '10fr 4fr'}}
      >
        {item.manifest && (
          <Box gridArea="image">
            {/* <MiradorWithNoSSR manifest={[props.item.manifest]} /> */}
            <CanvasPanelFullScreedWithNoSSR ref={ref} manifest={[item.manifest]} />
          </Box>
        )}

        <Box fontFamily="Montserrat" gridArea="metadata" pr="10">
          <Heading 
            fontFamily="Montserrat" 
            fontWeight="semibold" 
            color="red.600" 
            fontSize={{base: "sm", sm: "sm", md: "md", xl: "xl"}} 
            mb={1}
          >
            {title}
          </Heading>

          {description && (
            <PortableTextBlock 
              fontSize={{base: "sm", sm: "sm", md: "md", xl: "md"}} 
              fontWeight="200" 
              blocks={description} 
            />
          )}
        </Box>
      </Grid>
    </Container>
  )
}
