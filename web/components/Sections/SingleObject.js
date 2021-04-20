import dynamic from 'next/dynamic'
import {Grid, Flex, Heading, Spacer} from '@chakra-ui/react'
import Source from './Source'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../MiradorViewer'), {ssr: false})

export default function SingleObject(props) {
  if (!props && !props.item) {
    return null
  }

  const {title, description, item, canvasUrl} = props

  return (
    <Grid
      maxW={["xl", "xl", "xl", "6xl"]}
      my={{base: "6", md: "16", xl: "28"}}
      borderBottom={{base: "solid 1px", md: "none"}}
      borderColor="gray.300"
      gridGap={5}
      alignContent="start"
      gridTemplateAreas={{base: '"image" "metadata"', xl: '"image metadata"'}}
      gridTemplateColumns={{base: '3xl', xl: '10fr 4fr'}}
    >
  
      <MiradorWithNoSSR
        gridArea="image"
        variant="basic"
        h="50vh" 
        manifests={[{
          manifest: item.manifest,
          ...(canvasUrl && {canvasUrl: canvasUrl})
        }]} 
      />

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
  )
}
