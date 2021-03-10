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
      gridArea="header"
      position="sticky"
      top="0"
      align="center" 
      w="full" 
      p="5"
      justify="space-between" 
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

      <Spacer />

      <Flex display={{ sm: "none", md: "flex" }}>

      {mainNavigation?.items && mainNavigation.items.map((item) => (
        <MenuItem  key={item._key}>
          <ActiveLink fontFamily="'Open Sans'" href={`/${item.route}`} activeClassName="active">
            <a>{item.label}</a>
          </ActiveLink>
        </MenuItem>
      ))}
      </Flex>

      <Button
        variant="link"
        onClick={() => onOpen()}
      >
        <Icon as={HamburgerIcon} />
      </Button>

      <Drawer placement="top" zIndex="9999999999999999999999999999999999999" onClose={onClose} isOpen={isOpen} size="full" onOverlayClick={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            {/* <DrawerHeader>Nav</DrawerHeader> */}
            <DrawerBody>

              <Center h="full" w="full">
                <VStack>
                  <Flex>
                    {mainNavigation?.items && mainNavigation.items.map((item) => (
                      <MenuItem key={item._key}>
                        <ActiveLink href={`/${item.route}`} activeClassName="active">
                          <a onClick={onClose}>{item.label}</a>
                        </ActiveLink>
                      </MenuItem>
                    ))}
                  </Flex>

                  <Divider />
                  
                  <Flex>
                    {footer.navMenu?.items && footer.navMenu.items.map((item) => (
                      <MenuItem key={item._key}>
                        <ActiveLink href={`/${item.route}`} activeClassName="active">
                          <a onClick={onClose}>{item.label}</a>
                        </ActiveLink>
                      </MenuItem>
                    ))}
                  </Flex>

                  <Divider />

                  <Flex>
                    <Heading fontSize="sm" fontWeight="500">
                      <Link href="http://marcus.uib.no/">
                        <a><Icon as={BsArrowUpLeft} /> tilbake til Marcus</a>
                      </Link>
                    </Heading>
                  </Flex>
                </VStack>
              </Center>
              
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  )
}
