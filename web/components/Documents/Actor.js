import Image from 'next/image'
import { Badge, Box, Container, Divider, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import PortableTextBlock from '../PT/PortableTextBlock'
import Cards from '../Cards'
import RenderMergedActivityStreamList from '../ActivityStream/MergedActivityStreamList/RenderMergedActivityStreamList'
import { getNextSanityImage } from '../../lib/sanity.server'
import Members from '../Members'

export default function Actor(item) {
  if (!item) {
    return null
  }

  return (
    <Container my="5" maxWidth="6xl">
      <Flex pb="10">
        {item.image && (
          <Box mr="4" w="3xs" position="relative">
            <Image
              alt={item.label.no}
              {...getNextSanityImage(item.image)}
              layout="responsive"
              objectFit="contain"
            />
          </Box>
        )}

        <Box pt="2">
          <Heading fontSize={['2xl', '4xl', '4xl', '5xl']}>
            <a>{item.label.no}</a>
          </Heading>

          {item.shortDescription && <Text>{item.shortDescription}</Text>}

          <Box d="flex" alignItems="baseline">
            {item.hasType &&
              item.hasType.map((type) => (
                <Badge key={type._id} borderRadius="full" px="2">
                  {type.label?.no}
                </Badge>
              ))}
          </Box>

          {item.referredToBy && (
            <Box maxWidth={['xl', null, '2xl', null]} my="10">
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

          {item.hasMember.length > 0 && <Members data={item.hasMember} />}
        </Box>
      </Flex>

      {item.mentionedIn.length != 0 && (
        <>
          <Divider mb="10" />
          <Heading as="h2" mb="3">
            Koblet til...
          </Heading>
          <Cards items={item.mentionedIn} />
        </>
      )}
    </Container>
  )
}
