import NextImage from 'next/image'
import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react'

export default function Publisher({ publishers }) {
  if (!publishers) {
    return null
  }

  const sytti = useColorModeValue(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/img/75ar-med-tanker.svg`,
    `${process.env.NEXT_PUBLIC_BASE_PATH}/img/75ar-med-tanker-dark.svg`,
  )

  const uib = useColorModeValue(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/img/uibmerke_grayscale.svg`,
    `${process.env.NEXT_PUBLIC_BASE_PATH}/img/uibmerke_grayscale-dark.svg`,
  )

  return (
    <Flex maxW="xl" marginBottom={5}>
      <Box m="6" minW="100px" maxW={['100px', null, '150px', null]}>
        <a href="https://www.uib.no/75%C3%A5r">
          <Image alt="Universitetet i Bergen 75 år" src={sytti} w="full" />
        </a>
      </Box>
      <Box m="6" minW="100px" maxW={['100px', null, '150px', null]}>
        <a href="https://uib.no/ub">
          <Image alt="Universitetet i Bergen" src={uib} w="full" />
        </a>
      </Box>
      <Box m="6" minW="100px" maxW={['100px', null, '150px', null]}>
        <a href="https://arvenetternansen.com">
          <NextImage
            layout="responsive"
            width={100}
            height={100}
            alt="Arven etter Nansen"
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/img/nansen-logo-legacy.png`}
            w="full"
          />
        </a>
      </Box>
      {/* {publishers &&
        publishers.map((p) => (
          <Box key={p._id} m="4" maxW={['100px', null, '150px', null]}>
            <Link href={`/id/${p._id}`}>
              <NextImage alt={p.label.no} {...getNextSanityImage(p.image)} layout="intrinsic" />
            </Link>
            <Link href={`/id/${p._id}`}>{p.label.no}</Link>
          </Box>
        ))} */}
    </Flex>
  )
}
