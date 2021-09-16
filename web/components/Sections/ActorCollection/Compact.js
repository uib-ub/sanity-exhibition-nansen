import { Heading, Flex, Image, Text, Box } from '@chakra-ui/react'
import { imageBuilder } from '../../../lib/sanity'
import PortableTextBlock from '../../PT/PortableTextBlock'
import { kebabCase } from 'lodash'
import Link from '../../Link'

export default function Compact({ data }) {
  return (
    <>
      {data.map((item) => (
        <Flex key={item.item._id} p="4" my="5" bg="lightgray" direction="row">
          {item.image && (
            <Image
              mb="3"
              mr="5"
              boxSize="200"
              src={imageBuilder.image(item.image).width(200).height(200).url()}
              alt={item.label || 'No label'}
            />
          )}
          <Box>
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
        </Flex>
      ))}
    </>
  )
}
