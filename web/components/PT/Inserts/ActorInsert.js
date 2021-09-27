import Image from 'next/image'
import { Container, Box, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import Link from '../../Link'
import { getNextSanityImage } from '../../../lib/sanity.server'

export default function ActorInsert(props) {
  if (!props) {
    return null
  }
  /* console.log(props) */

  const { _id, label, shortDescription, memberOf } = props

  return (
    <Container maxW={['xl', null, '2xl', null]} mb="5" px="0">
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
        <Box>
          <Heading fontSize={['2xl', null, '3xl', null]} mb="1">
            <Link href={`/id/${_id}`}>{label.no}</Link>
          </Heading>
          {memberOf &&
            memberOf.map((org) => (
              <HStack key={org._id} spacing={4} pb="1" justifyContent="baseline">
                {org.image && (
                  <Image
                    alt={label.no}
                    {...getNextSanityImage(org.image)}
                    layout="fixed"
                    /* sizes="(max-width: 800px) 100vw, 800px" */
                    objectFit="cover"
                    width={36}
                    height={36}
                  />
                )}
                <Heading fontSize={['lg', null, 'xl', null]} color="blackAlpha.800" display="block">
                  {org.label.no}
                </Heading>
              </HStack>
            ))}
          {shortDescription && <Text fontSize="lg">{shortDescription}</Text>}
        </Box>
      </Flex>
    </Container>
  )
}
