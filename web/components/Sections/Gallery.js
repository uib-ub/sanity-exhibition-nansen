import { Container, Flex } from '@chakra-ui/react'
import ItemView from './ItemView'

export default function Gallery(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { items } = props

  return (
    <Container maxW="full" px="0">
      <Flex
        maxW="full"
        px="12"
        py="10"
        my="10"
        mx="0"
        bg="blackAlpha.100"
        overflowX="scroll"
        direction={{ base: 'column', sm: 'row' }}
        boxSizing="content-box"
      >
        {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
        {items && items.map((i) => <ItemView key={i._key} {...i} />)}
      </Flex>
    </Container>
  )
}