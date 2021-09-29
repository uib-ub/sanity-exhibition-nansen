import { Flex } from '@chakra-ui/react'
import ItemView from './ItemView'

export default function Gallery(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { items } = props

  return (
    <Flex maxW="full" p="12" bg="blackAlpha.100" overflowX="scroll" direction="row">
      {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
      {items && items.map((i) => <ItemView key={i._id} {...i} />)}
    </Flex>
  )
}
