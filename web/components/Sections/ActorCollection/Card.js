import Image from 'next/image'
import { Box, Heading, Text } from '@chakra-ui/react'
import { getNextSanityImage } from '../../../lib/sanity.server'
import PortableTextBlock from '../../PT/PortableTextBlock'
import { kebabCase } from 'lodash'
import Link from '../../Link'

export default function ActorCollectionCard({ data }) {
  return (
    <>
      {data.map((item) => (
        <Box key={item.item._id} p="4" bg="lightgray" borderRadius="5" boxShadow="md">
          {item.image && (
            <Box mb="3" position="relative">
              <Image
                alt={item.label || 'No label'}
                {...getNextSanityImage(item.image)}
                layout="responsive"
              />
            </Box>
          )}

          <Heading
            id={kebabCase(item.label)}
            as="h3"
            maxW={['xl', null, 'xl', null]}
            mx="auto"
            fontSize={['xl', '2xl', '3xl', null]}
          >
            <Link href={`/id/${item.item._id}`}>{item.label}</Link>
          </Heading>

          {item.item?.shortDescription && (
            <Text maxW={['xl', null, 'xl', null]} mx="auto">
              {item.item.shortDescription}
            </Text>
          )}
          <PortableTextBlock blocks={item.description} />
        </Box>
      ))}
    </>
  )
}
