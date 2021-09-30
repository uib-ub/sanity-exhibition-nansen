import Image from 'next/image'
import { Flex, Box, useColorModeValue } from '@chakra-ui/react'
import Caption from './shared/Caption'
import { getNextSanityImage } from '../../lib/sanity.server'
import WrapperGrid from './WrapperGrid'

export default function IllustrationWithCaption(props) {
  if ((!props && !props.illustration) || props.disabled === true) {
    return null
  }
  const bg = useColorModeValue('blackAlpha.100', 'black')

  const { title, content, illustration, source } = props

  return (
    <WrapperGrid>
      {illustration ? (
        <Box minH="50vh" w="100%" gridArea="image" bgColor={bg} color="" position="relative">
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
