import {Link as ChakraLink} from '@chakra-ui/react'
import {Link as NextLink} from 'next/link'

export default function Link({href, children}) {
  if (!href) {
    return null
  }

  return (
    <ChakraLink color="teal.500" borderBottom="1px dotted" as={NextLink} href={href}>
      {children}
    </ChakraLink>
  )
}
