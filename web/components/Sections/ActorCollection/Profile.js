import Image from 'next/image'
import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import PortableTextBlock from '../../PT/PortableTextBlock'
import { kebabCase } from 'lodash'
import Link from '../../Link'
import { getNextSanityImage } from '../../../lib/sanity.server'

export default function Profile({ data }) {
  return (
    <>
      {data.map((item) => (
        <React.Fragment key={item.item._id}>
          {item.image && (
            <Box mb="5" mt="26">
              <Image {...getNextSanityImage(item.image)} alt={item.label.no} layout="responsive" />
            </Box>
          )}

          <Heading
            id={kebabCase(item.label)}
            as="h3"
            maxW={['xl', null, '2xl', null]}
            mx="auto"
            fontSize={['xl', '2xl', '3xl', null]}
          >
            <Link href={`/id/${item.item._id}`}>{item.label}</Link>
          </Heading>

          {item.item?.shortDescription && (
            <Text maxW={['xl', null, '2xl', null]} mx="auto">
              {item.item.shortDescription}
            </Text>
          )}
          <PortableTextBlock blocks={item.description} />
        </React.Fragment>
      ))}
    </>
  )
}
