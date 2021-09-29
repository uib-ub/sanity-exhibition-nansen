import dynamic from 'next/dynamic'
import { Flex } from '@chakra-ui/react'
import Caption from './shared/Caption'
import WrapperGrid from './WrapperGrid'

const MiradorWithNoSSR = dynamic(() => import('../MiradorViewer'), { ssr: false })

export default function SingleObject(props) {
  if ((!props && !props.item) || props.disabled === true) {
    return null
  }

  const { title, description, item, canvasUrl } = props

  return (
    <WrapperGrid>
      {item?.manifest ? (
        <MiradorWithNoSSR
          gridArea="image"
          variant="basic"
          manifests={[
            {
              manifest: item.manifest,
              ...(canvasUrl && { canvasUrl: canvasUrl }),
            },
          ]}
        />
      ) : (
        <Flex gridArea="image">Mangler manifest</Flex>
      )}

      <Caption title={title} content={description} sourceItem={item} />
    </WrapperGrid>
  )
}
