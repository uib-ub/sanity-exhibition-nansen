import { Heading, Flex, Box, Icon, Image, Spacer } from '@chakra-ui/react'
import PortableTextBlock from '../PT/PortableTextBlock'
import { BsInfoCircle } from 'react-icons/bs'
import { imageBuilder } from '../../lib/sanity'

export default function ItemView(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { title, description, image, source } = props

  return (
    <Box
      px="4"
      direction="column"
      position="relative"
      alignSelf="start"
      flex="0 0 auto"
      mb={[5, 0, null, null]}
    >
      <Box>
        {image && (
          <Image
            maxH="50vh"
            maxW="90vw"
            alt=""
            src={imageBuilder.image(image).fit('max').height(500).url()}
            fit="contain"
          />
        )}
        {!image && <Flex>Mangler illustrasjon</Flex>}
      </Box>

      <Flex fontFamily="Montserrat" flex="0 1 auto" mt="3" direction="column">
        {title && (
          <Heading
            fontFamily="Montserrat"
            fontWeight="semibold"
            color="red.600"
            fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'md' }}
            mb={1}
          >
            {title}
          </Heading>
        )}

        {description && (
          <PortableTextBlock
            fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'md' }}
            fontWeight="200"
            mx="0"
            maxW={['md', 'lg', 'lg', null]}
            blocks={description}
          />
        )}

        <Spacer />

        {source && (
          <Flex
            color="gray.500"
            fontSize={{ base: 'xs', sm: 'xs', md: 'sm', xl: 'sm' }}
            pb={{ base: '2', md: '0' }}
            mb="0"
            flex="0 0 auto"
          >
            <Icon as={BsInfoCircle} mr="2" mt="1" />
            <PortableTextBlock
              color="gray.500"
              fontSize={{ base: 'xs', sm: 'xs', md: 'sm', xl: 'sm' }}
              mb="0"
              mx="0"
              maxW={['md', 'md', 'lg', null]}
              blocks={source}
            />
          </Flex>
        )}
      </Flex>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </Box>
  )
}
