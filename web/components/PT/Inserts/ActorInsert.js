import Image from 'next/image'
import { Container, Box, Flex, Heading, Text } from '@chakra-ui/react'
import Link from '../../Link'
import { getNextSanityImage } from '../../../lib/sanity.server'

export default function ActorInsert(props) {
  if (!props) {
    return null
  }
  /* console.log(props) */

  const { _id, label, shortDescription, memberOf } = props

  return (
    <Container maxW={['xl', null, '2xl', null]} mb="5">
      <Flex>
        {/* {image && (
          <Box mr="4">
            <Image
              alt={label.no}
              {...getNextSanityImage(image)}
              layout="intrinsic"
              objectFit="cover"
              width={300}
              height={300}
            />
          </Box>
        )} */}
        <Box my="3">
          <Heading size="md" mb="1">
            <Link href={`/id/${_id}`}>{label.no}</Link>
          </Heading>
          {memberOf &&
            memberOf.map((org) => (
              <Flex key={org._id} alignItems="center" pb="1">
                {org.image && (
                  <Box mr="2">
                    <Image
                      alt={label.no}
                      {...getNextSanityImage(org.image)}
                      layout="fixed"
                      /* sizes="(max-width: 800px) 100vw, 800px" */
                      objectFit="cover"
                      width={30}
                      height={30}
                    />
                  </Box>
                )}
                <Heading size="sm" display="block">
                  {org.label.no}
                </Heading>
              </Flex>
            ))}
          {shortDescription && <Text fontSize="lg">{shortDescription}</Text>}
        </Box>
      </Flex>
    </Container>
  )
}
