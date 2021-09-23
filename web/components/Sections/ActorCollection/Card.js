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
        <Box
          key={item.item._id}
          borderRadius="5"
          boxShadow="lg"
          borderColor="gray.300"
          borderWidth="thin"
        >
          {item.image && (
            <Box mb="3" position="relative" borderTopRadius="5">
              <Image
                borderTopRadius="5"
                alt={item.label || 'No label'}
                {...getNextSanityImage(item.image)}
                layout="responsive"
              />
            </Box>
          )}

          <Box px="3">
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
            <PortableTextBlock fontSize={['sm', 'lg', null, null]} blocks={item.description} />
          </Box>
        </Box>
      ))}
    </>
  )
}
