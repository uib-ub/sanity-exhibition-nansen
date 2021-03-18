import React from 'react'
import Link from 'next/link'
import {Flex, Box, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, DrawerCloseButton, Spacer, Button, Heading, Text, Icon, useDisclosure, useColorMode, useColorModeValue, VStack, Container, Center} from '@chakra-ui/react'
import ActiveLink from './ActiveLink'
import {BsArrowUpLeft} from 'react-icons/bs'
import Headroom from 'react-headroom'
import { HamburgerIcon } from '@chakra-ui/icons'

const MenuItem = ({children}) => (
  <Text mt={{base: 4, md: 0}} mr={6} mb="0" display="block">
    {children}
  </Text>
)

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
      justify="flex-start"
      wrap="wrap"
      color={color}
      bg="rgba(255,255,255,0.5)"
      zIndex="2"
    >
      <Heading fontSize="xl">
        <Link href="/">
          <a>{title}</a>
        </Link>
      </Heading>

      <Flex display={{ base: "none", md: "flex" }} direction="column">
        {mainNavigation?.items && mainNavigation.items.map((item) => (
          <MenuItem  key={item._key}>
            <ActiveLink fontFamily="'Open Sans'" href={`/${item.route}`} activeClassName="active">
              <a>{item.label}</a>
            </ActiveLink>
          </MenuItem>
        ))}
      </Flex>
    </Flex>
  )
}
