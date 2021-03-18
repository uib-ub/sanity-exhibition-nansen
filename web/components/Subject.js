import {Box, Flex, Heading, Wrap, WrapItem, Tag} from '@chakra-ui/react'
import Link from './Link'

export default function Subject({subjects}) {
  if (!subjects) {
    return null
  }

  return (
    <Flex borderTop="solid 1px" borderColor="gray.200" pt="4">
      <Box as="dt" w="20%">
        <Heading as="h3" fontWeight="semibold" fontSize="sm">Emner</Heading>
      </Box>
      
      <Wrap as="dd" fontFamily="Montserrat" marginBottom={5}>
        {subjects.map((subject) => (
          <WrapItem key={subject._id}>
            <Tag colorScheme="blackAlpha" size="sm">
              <Link href={`/id/${subject._id}`}>{subject.label.nor}</Link>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}
