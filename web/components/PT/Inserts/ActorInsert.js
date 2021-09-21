import { Container, Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { imageBuilder } from '../../../lib/sanity'
import Link from '../../Link'

export default function ActorInsert(props) {
  if (!props) {
    return null
  }
  /* console.log(props) */

  const { _id, label, image, shortDescription, memberOf } = props

  return (
    <Container maxW={['xl', null, '2xl', null]} mb="5">
      <Flex>
        {image && (
          <Image
            alt=""
            boxSize="150px"
            src={imageBuilder.image(image).width(150).height(150).url()}
            mr="4"
          />
        )}
        <Box my="3">
          <Heading size="md" mb="1">
            <Link href={`/id/${_id}`}>{label.no}</Link>
          </Heading>
          {memberOf &&
            memberOf.map((org) => (
              <Flex key={org._id} alignItems="center" pb="2">
                {org.image && (
                  <Image
                    alt=""
                    w="35px"
                    src={imageBuilder.image(org.image).width(35).fit('max').url()}
                    mr="3"
                  />
                )}
                <Heading size="sm">{org.label.no}</Heading>
              </Flex>
            ))}
          {shortDescription && <Text fontSize="lg">{shortDescription}</Text>}
        </Box>
      </Flex>
    </Container>
  )
}
