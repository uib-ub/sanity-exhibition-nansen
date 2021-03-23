import {Box, Flex, Heading, Link, Wrap, WrapItem} from '@chakra-ui/react'
import Activity from './Activity'

export default function ActivityStream({stream}) {
  if (!stream) {
    return null
  }

  return (
    <> 
      <Heading as="dt" fontFamily="Montserrat" fontWeight="semibold" fontSize="sm" pb="2">Hendelser</Heading>
      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
        {stream.map((activity) => (
          <Activity key={activity._key} data={activity} />
        ))}
      </Wrap>
    </>
  )
}
