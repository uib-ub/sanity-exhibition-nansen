import {imageBuilder} from '../lib/sanity'
import {Avatar, Box, Flex, Heading, Link, Wrap, Tag, TagLabel} from '@chakra-ui/react'

export default function Depicts({depicted}) {
  if (!depicted) {
    return null
  }

  return (

        <Flex borderTop="solid 1px" borderColor="gray.200" pt="4">
        <Box as="dt" w="20%">
          <Heading as="h3" fontWeight="semibold" fontSize="sm">Avbilder</Heading>
        </Box>
        
        <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
          {depicted.map((actor) => (
            <Tag key={actor._id} size="lg" colorScheme="blackAlpha">
              <Avatar
                size="xs"
                ml={-1}
                mr={2}
                name={actor.label}
                src={imageBuilder
                  .image(actor.image)
                  .height(300)
                  .width(300)
                  .url()}
              />
              <TagLabel><Link href={`/id/${actor._id}`}>{actor.label}</Link></TagLabel>
            </Tag>
          ))}
        </Wrap>
      </Flex>
  )
}
