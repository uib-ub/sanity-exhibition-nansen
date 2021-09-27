import { Flex, Heading, Spacer, Icon } from '@chakra-ui/react'
import { BsInfoCircle } from 'react-icons/bs'
import PortableTextBlock from '../../PT/PortableTextBlock'
import Source from '../Source'

export default function Caption(props) {
  if (!props) {
    return null
  }

  const { title, content, source, sourceItem } = props

  return (
    <Flex direction="column" fontFamily="Montserrat" pr="10" overflowY={{ xl: 'scroll' }}>
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

      {content && (
        <PortableTextBlock
          fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'md' }}
          maxW={['xl', null, '2xl', null]}
          fontWeight="200"
          mx="inherit"
          blocks={content}
        />
      )}

      <Spacer />

      {source && (
        <Flex
          color="gray.500"
          fontSize={{ base: 'xs', sm: 'xs', md: 'sm', xl: 'sm' }}
          pb={{ base: '2', md: '0' }}
          mb="0"
        >
          <Icon as={BsInfoCircle} mr="2" mt="1" />
          <PortableTextBlock
            color="gray.500"
            fontSize={{ base: 'xs', sm: 'xs', md: 'sm', xl: 'sm' }}
            mb="0"
            mx="0"
            blocks={source}
          />
        </Flex>
      )}
      {sourceItem && <Source {...sourceItem} />}
    </Flex>
  )
}
