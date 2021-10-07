import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'
import { Flex, Grid } from '@chakra-ui/react'
import Caption from './shared/Caption'

const MiradorWithNoSSR = dynamic(() => import('../MiradorViewer'), { ssr: false })

export default function MiradorGallery(props) {
  if ((!props && !props.items) || props.disabled === true) {
    return null
  }
  const { title, description, items } = props

  const { ref, inView } = useInView({
    root: null,
    rootMargin: '0px',
    triggerOnce: true,
    threshold: 1.0,
  })

  const height = '60vh'

  return (
    <Grid
      ref={ref}
      minH={height}
      maxW={['xl', '4xl', '4xl', '6xl']}
      my={{ base: '6', md: '16', lg: '16', xl: '20' }}
      borderBottom={{ base: 'solid 1px', md: 'none' }}
      borderColor="gray.200"
      gridGap={[2, null, 5, null]}
      gridTemplateAreas={{ base: '"image" "metadata"', xl: '"image metadata"' }}
      gridTemplateColumns={{ base: 'auto', lg: '10fr 3fr' }}
      gridTemplateRows="1fr auto"
      mx="auto"
      px={[4, 4, null, null]}
    >
      {items && inView && (
        <MiradorWithNoSSR gridArea="image" variant="standard" manifests={items} />
      )}
      {!items && <Flex gridArea="image">Mangler manifest</Flex>}

      {inView && <Caption title={title} content={description} />}
    </Grid>
  )
}
