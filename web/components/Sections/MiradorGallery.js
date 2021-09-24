import dynamic from 'next/dynamic'
import { Flex } from '@chakra-ui/react'
import Caption from './shared/caption'
import WrapperGrid from './WrapperGrid'

const MiradorWithNoSSR = dynamic(() => import('../MiradorViewer'), { ssr: false })

export default function MiradorGallery(props) {
  if ((!props && !props.items) || props.disabled === true) {
    return null
  }

  const { title, description, items } = props

  return (
    <WrapperGrid>
      {items ? (
        <MiradorWithNoSSR gridArea="image" variant="standard" manifests={items} />
      ) : (
        <Flex gridArea="image">Mangler manifest</Flex>
      )}

      <Caption title={title} content={description} />
    </WrapperGrid>
  )
}
