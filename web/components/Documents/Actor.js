import Link from 'next/link'
import {Image, Badge, Box, Container, Flex, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'
import Cards from '../Cards'
import {imageBuilder} from '../../lib/sanity'

export default function Actor(item) {
  if(!item) return null

  return (
    <Container 
      maxW="full"
      mt="5"
    >
      <Flex pb="10">

        {item.image && (
          <Image
            boxSize="100"
            name={item.label}
            mr="5"
            src={imageBuilder.image(item.image).height('200').width('200').url()}
          />
        )}

        <Box pt="2">
          <Heading fontSize={["2xl", "4xl", "5xl", "6xl"]}>
            <a>{item.label}</a>
          </Heading>
          <Box d="flex" alignItems="baseline">
            {item.hasType &&
              item.hasType.map((type) => (
                <Badge key={type._id} borderRadius="full" px="2" colorScheme="teal">
                  {type.label?.nor}
                </Badge>
              ))}
            {!item.hasType && (
              <Badge borderRadius="full" px="2" colorScheme="teal">
                Person
              </Badge>
            )}
          </Box>
        </Box>
      </Flex>

      <Box maxW="2xl" mb="10">
        {item?.referredToBy?.map((ref) => (
          <PortableTextBlock key={ref._key} blocks={ref.body} />
        ))}
      </Box>
      

      <Heading as="h3" mb="3">
        Relasjoner (WIP)
      </Heading>

      {item.hasMember && item.hasMember.map((member) => (
        <Link href={member._id}>
          <a>{member.label}</a>
        </Link>
      ))}

      {item.mentionedIn && <Cards items={item.mentionedIn} />}
    </Container>
  )
}
