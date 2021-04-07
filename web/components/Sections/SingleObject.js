import React from 'react'
import dynamic from 'next/dynamic'
import {Grid, Container, Box, Flex, Link, Heading, Spacer} from '@chakra-ui/react'
import Source from './Source'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../Mirador'), {ssr: false})
/* const CanvasPanelFullScreedWithNoSSR = dynamic(() => import('../CanvasPanelFullScreen'), {ssr: false}) */

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
        my={{base: 5, md: 8, xl: 16}}
        borderBottom={{base: "solid 1px", md: "none"}}
        borderColor="gray.300"
        gridGap={5}
        alignContent="start"
        gridTemplateAreas={{base: '"image" "metadata"', lg: '"image metadata"'}}
        gridTemplateColumns={{base: '100%', lg: '10fr 4fr'}}
      >
        {item.manifest && (
          <Box gridArea="image" bgColor="gray.100">
            
            <MiradorWithNoSSR palette="light" hideWindowTitle="true" h="70vh" windows={[{manifest: props.item.manifest}]} />
            {/* <CanvasPanelFullScreedWithNoSSR ref={ref} manifest={[item.manifest]} /> */}
          </Box>
        )}

        <Flex 
          flexDirection="column" 
          fontFamily="Montserrat" 
          gridArea="metadata" 
          pr={{base: 0, md: 10}}
        >
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
              fontSize={{base: "sm", sm: "sm", md: "sm", xl: "md"}} 
              fontWeight="200"
              blocks={description} 
            />
          )}
          <Spacer />
          <Source {...item} />
          
        </Flex>
      </Grid>
    </Container>
  )
}
