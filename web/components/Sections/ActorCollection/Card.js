import { Box, Heading, Image, Text } from '@chakra-ui/react'
import PortableTextBlock from '../../PT/PortableTextBlock'
import { kebabCase } from 'lodash'
import Link from '../../Link'
import { imageBuilder } from '../../../lib/sanity'
// import Image from 'next/image'
// import { getNextSanityImage } from '../../../lib/sanity.server'

export default function ActorCollectionCard({ data }) {
  return (
    <>
      {data.map((item) => (
        <Box maxW="xs" key={item.item._id} m="4">
          {item.image && (
            <Box mb="3">
              <Image
                mx="auto"
                borderRadius="50%"
                alt={item.label || 'No label'}
                //{...getNextSanityImage(item.image)}
                src={imageBuilder.image(item.image).width('200').height('250').fit('fill').url()}
                objectFit="contain"
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
              textAlign="center"
            >
              <Link href={`/id/${item.item._id}`}>{item.label}</Link>
            </Heading>

            {item.item?.shortDescription && (
              <Text maxW={['xl', null, 'xl', null]} mx="auto" textAlign="center">
                {item.item.shortDescription}
              </Text>
            )}
            <PortableTextBlock
              fontSize={['sm', 'lg', null, null]}
              textAlign="center"
              blocks={item.description}
            />
          </Box>
        </Box>
      ))}
    </>
  )
}
