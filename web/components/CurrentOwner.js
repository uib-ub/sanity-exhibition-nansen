import {Box, Flex, Heading, Link, Wrap, WrapItem} from '@chakra-ui/react'

export default function CurrentOwner({owners}) {
  if (!owners) {
    return null
  }

  return (
    <Flex borderTop="solid 1px" borderColor="gray.200" pt="4">
      <Box as="dt" w="20%">
        <Heading as="h3" fontWeight="semibold" fontSize="sm">Eier</Heading>
      </Box>
      
      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
        {owners.map((owner) => (
          <WrapItem key={owner._id}>
            <Link fontSize="sm" key={owner._id} href={`/id/${owner._id}`}>
              {owner.label}
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}
