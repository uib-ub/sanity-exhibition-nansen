import {Box, Flex, Heading, Link, Wrap, WrapItem, Tag} from '@chakra-ui/react'

export default function HasType({types}) {
  if (!types) {
    return null
  }

  return (
    <Flex borderTop="solid 1px" borderColor="gray.200" pt="4">
      <Box as="dt" w="20%">
        <Heading as="h3" fontWeight="semibold" fontSize="sm">Klassifisering</Heading>
      </Box>
      
      <Wrap as="dd" fontFamily="Montserrat" mb={4}>
        {types.map((type) => (
          <WrapItem key={type._id}>
            {/* <Link fontSize="sm" key={owner._id} href={`/id/${owner._id}`}>
              {owner.label}
            </Link> */}
            <Tag key={type._id} size="sm">
              {type.label.nor}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}
