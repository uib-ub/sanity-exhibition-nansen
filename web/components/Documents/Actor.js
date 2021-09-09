import Link from '../Link'
import { Image, Badge, Box, Container, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'
import Cards from '../Cards'
import { imageBuilder } from '../../lib/sanity'
import RenderMergedActivityStreamList from '../ActivityStream/MergedActivityStreamList/RenderMergedActivityStreamList'

export default function Actor(item) {
  if (!item) {
    return null
  }

  return (
    <Container my="5" maxWidth="6xl">
      <Flex pb="10">
        {item.image && (
          <Image
            boxSize="200"
            name={item.label.no}
            mr="5"
            src={imageBuilder.image(item.image).height('400').width('400').url()}
            alt=""
          />
        )}

        <Box pt="2">
          <Heading fontSize={['2xl', '4xl', '4xl', '5xl']}>
            <a>{item.label.no}</a>
          </Heading>

          {item.shortDescription && <Text>{item.shortDescription}</Text>}

          <Box d="flex" alignItems="baseline">
            {item.hasType &&
              item.hasType.map((type) => (
                <Badge key={type._id} borderRadius="full" px="2" colorScheme="teal">
                  {type.label?.no}
                </Badge>
              ))}
          </Box>
        </Box>
      </Flex>

      {item.referredToBy && (
        <Box maxWidth={['xl', null, 'xl', null]} mb="10">
          {item.referredToBy?.map((ref) => (
            <PortableTextBlock key={ref._key} blocks={ref.body} />
          ))}
        </Box>
      )}

      {item.activityStream && (
        <>
          <Heading as="h2" mb="3">
            Hendelser
          </Heading>

          <SimpleGrid
            w="full"
            mb="5"
            columnGap="5"
            templateColumns={{
              base: '1fr',
              md: 'auto 1fr',
            }}
          >
            <RenderMergedActivityStreamList stream={item.activityStream} />
          </SimpleGrid>
        </>
      )}

      {item.hasMember &&
        item.hasMember.map((member) => (
          <Link key={member._id} href={member._id}>
            {member.label.no}
          </Link>
        ))}

      {item.mentionedIn.length != 0 && (
        <>
          <Heading as="h2" mb="3">
            Koblet til...
          </Heading>
          <Cards items={item.mentionedIn} />
        </>
      )}
    </Container>
  )
}
