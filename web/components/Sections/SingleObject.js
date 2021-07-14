import dynamic from 'next/dynamic'
import {Grid, Flex, Heading, Spacer} from '@chakra-ui/react'
import Source from './Source'
import PortableTextBlock from '../PortableTextBlock'
import Caption from './shared/caption'

const MiradorWithNoSSR = dynamic(() => import('../MiradorViewer'), {ssr: false})

export default function SingleObject(props) {
  if (!props && !props.item) {
    return null
  }

  const {title, description, item, canvasUrl} = props

  return (
    <Grid
      maxW={['xl', 'xl', 'xl', '6xl']}
      my={{base: '6', md: '16', xl: '20'}}
      borderBottom={{base: 'solid 1px', md: 'none'}}
      borderColor="gray.300"
      gridGap={5}
      gridTemplateAreas={{base: '"image" "metadata"', xl: '"image metadata"'}}
      gridTemplateColumns={{base: '3xl', xl: '10fr 4fr'}}
      gridTemplateRows="1fr auto"
    >
  
      {item?.manifest ? 
        (<MiradorWithNoSSR
          gridArea="image"
          variant="basic"  
          manifests={[{
            manifest: item.manifest,
            ...(canvasUrl && {canvasUrl: canvasUrl})
          }]} 
        />) :
        (<Flex gridArea="image">Mangler manifest</Flex>)
      }

      <Caption title={title} content={description} sourceItem={item} />
    </Grid>
  )
}
