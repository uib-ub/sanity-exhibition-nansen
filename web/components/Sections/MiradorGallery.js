import dynamic from 'next/dynamic'
import { Flex, Grid } from '@chakra-ui/react'
import Caption from './shared/caption'

const MiradorWithNoSSR = dynamic(() => import('../MiradorViewer'), { ssr: false })

export default function MiradorGallery(props) {
  if (!props && !props.items) {
    return null
  }

  const { title, description, items } = props

  return (
    <Grid
      maxW={['xl', 'xl', 'xl', '6xl']}
      my={{ base: '6', md: '16', xl: '20' }}
      borderBottom={{ base: 'solid 1px', md: 'none' }}
      borderColor="gray.300"
      gridGap={5}
      gridTemplateAreas={{ base: '"image" "metadata"', xl: '"image metadata"' }}
      gridTemplateColumns={{ base: '3xl', xl: '10fr 4fr' }}
      gridTemplateRows="1fr auto"
    >
      {items ? (
        <MiradorWithNoSSR gridArea="image" variant="standard" manifests={items} />
      ) : (
        <Flex gridArea="image">Mangler manifest</Flex>
      )}

      <Caption title={title} content={description} />
    </Grid>
  )
}
