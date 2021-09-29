import Image from 'next/image'
import { Flex, Box } from '@chakra-ui/react'
import Caption from './shared/caption'
import { getNextSanityImage } from '../../lib/sanity.server'

export default function ItemView(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { title, description, image, source } = props

  return (
    <Box px="4" width="100%">
      <Box h="60vh" w="100%" position="relative">
        {image && (
          <Image
            alt=""
            {...getNextSanityImage(image)}
            layout="responsive"
            width={600}
            height={600}
            objectFit="contain"
          />
        )}
        {!image && <Flex>Mangler illustrasjon</Flex>}
      </Box>

      <Caption title={title} content={description} source={source} />
    </Box>
  )
}
