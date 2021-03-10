import React from 'react'
import {Flex} from '@chakra-ui/react'
import Headroom from 'react-headroom'

export default function HeaderNavBarContainer({children, ...props}) {
  return (
    <Headroom style={{ zIndex:"9" }} >
      <Flex 
        as="header" 
        position="absolute"
        top="0"
        align="center" 
        w="full" 
        p="5"
        justify="space-between" 
        wrap="wrap"
        color="white"
        {...props}
      >
        {children}
      </Flex>
    </Headroom>
  )
}
