import { Box, Link, Image, Flex } from '@chakra-ui/react'
import { imageBuilder } from '../../../lib/sanity'

export default function Publisher({ publishers }) {
  if (!publishers) {
    return null
  }

  return (
    <Flex maxW="xl" marginBottom={5}>
      {publishers &&
        publishers.map((p) => (
          <Box key={p._id} m="6">
            <Link href={`/id/${p._id}`}>
              <Image
                boxSize={{ base: '100px', md: '140px' }}
                fit="contain"
                src={imageBuilder.image(p.image).height(140).fit('fillmax').url()}
                alt=""
              />
            </Link>
            {/* <Link href={`/id/${p._id}`}>{p.label.no}</Link> */}
          </Box>
        ))}
    </Flex>
  )
}
