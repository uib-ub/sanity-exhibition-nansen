import React from 'react'
import Link from 'next/link'
import {Flex, List, ListItem, Heading, Text, Icon, useDisclosure, useColorMode, useColorModeValue, VStack, Container, Center} from '@chakra-ui/react'
import ActiveLink from './ActiveLink'
import {BsArrowUpLeft} from 'react-icons/bs'
import Headroom from 'react-headroom'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function Header(props) {
  if(!props) {
    return null
  }
  
  const {colorMode, toggleColorMode} = useColorMode()
  const color = useColorModeValue('black', 'white')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {title, mainNavigation, footer} = props

  return (
    <Flex 
      as="header" 
      gridArea={{base: "header", md: "nav"}}
      direction="column"
      align="start" 
      w="full" 
      p="5"
      pl="10"
      justify="flex-start"
      wrap="wrap"
      color={color}
      bg="rgba(255,255,255,0.5)"
      zIndex="2"
      color="gray.600"
    >
      <Heading fontSize="3xl" fontFamily="EB Garamond">
        <Link href="/">
          <a>{title}</a>
        </Link>
      </Heading>

      <Flex display={{ base: "none", md: "flex" }} direction="column">
        <List styleType="lower-roman" spacing="1" fontSize={["md", "md", "md", "lg"]}>
          {mainNavigation?.items && mainNavigation.items.map((item) => (
            <ListItem key={item._key}>
              <ActiveLink fontFamily="'Open Sans'" href={`/${item.route}`} activeClassName="active">
                <a>{item.label}</a>
              </ActiveLink>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Flex>
  )
}
