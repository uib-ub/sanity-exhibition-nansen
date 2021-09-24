import Image from 'next/image'
import { Flex, Box } from '@chakra-ui/react'
import Caption from './shared/caption'
import { getNextSanityImage } from '../../lib/sanity.server'
import WrapperGrid from './WrapperGrid'

export default function IllustrationWithCaption(props) {
  if ((!props && !props.illustration) || props.disabled === true) {
    return null
  }

  const { title, content, illustration, source } = props

  return (
    <WrapperGrid>
      {illustration ? (
        <Box minH="60vh" w="100%" gridArea="image" bgColor="gray.200" position="relative">
          {illustration && (
            <Image
              alt=""
              {...getNextSanityImage(illustration.image)}
              layout="fill"
              objectFit="contain"
            />
          )}
        </Box>
      ) : (
        <Flex gridArea="image">Mangler illustrasjon</Flex>
      )}

      <Caption title={title} content={content} source={source} />
    </WrapperGrid>
  )
}
