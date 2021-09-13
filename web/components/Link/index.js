import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Link({ href, children }) {
  if (!href) {
    return null
  }

  return (
    <NextLink href={href} passHref>
      <ChakraLink color="teal.600">{children}</ChakraLink>
    </NextLink>
  )
}
