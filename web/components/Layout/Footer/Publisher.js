import NextImage from 'next/image'
import { Box, Flex, Image } from '@chakra-ui/react'
import { getNextSanityImage } from '../../../lib/sanity.server'

import Link from '../../Link'

export default function Publisher({ publishers }) {
  if (!publishers) {
    return null
  }

  return (
    <Flex maxW="xl" marginBottom={5}>
      <Box m="6" minW="100px" maxW={['100px', null, '150px', null]}>
        <Image
          alt=""
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/img/75ar-med-tanker.svg`}
          w="full"
        />
      </Box>
      {publishers &&
        publishers.map((p) => (
          <Box key={p._id} m="4" maxW={['100px', null, '150px', null]}>
            <Link href={`/id/${p._id}`}>
              <NextImage alt="" {...getNextSanityImage(p.image)} layout="intrinsic" />
            </Link>
            {/* <Link href={`/id/${p._id}`}>{p.label.no}</Link> */}
          </Box>
        ))}
    </Flex>
  )
}
