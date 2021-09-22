import Image from 'next/image'
import { Box, Flex } from '@chakra-ui/react'
import { getNextSanityImage } from '../../../lib/sanity.server'

import Link from '../../Link'

export default function Publisher({ publishers }) {
  if (!publishers) {
    return null
  }

  return (
    <Flex maxW="xl" marginBottom={5}>
      {publishers &&
        publishers.map((p) => (
          <Box key={p._id} m="6" maxW="150px">
            <Link href={`/id/${p._id}`}>
              <Image
                alt=""
                {...getNextSanityImage(p.image)}
                layout="intrinsic"
                /* sizes="(max-width: 800px) 100vw, 800px" */
                objectFit="contain"
                width={150}
                height={150}
              />
            </Link>
            {/* <Link href={`/id/${p._id}`}>{p.label.no}</Link> */}
          </Box>
        ))}
    </Flex>
  )
}
