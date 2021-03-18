import {Box, Flex, Heading, Link, Wrap, WrapItem} from '@chakra-ui/react'
import Activity from './Activity'

export default function ActivityStream({stream}) {
  if (!stream) {
    return null
  }

  return (
    <Flex borderTop="solid 1px" borderColor="gray.200" pt="4">
      <Box as="dt" w="20%">
        <Heading as="h3" fontWeight="semibold" fontSize="sm">Hendelser</Heading>
      </Box>

      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
        {stream.map((activity) => (
          <Activity key={activity._key} data={activity} />
        ))}
      </Wrap>
    </Flex>
  )
}
