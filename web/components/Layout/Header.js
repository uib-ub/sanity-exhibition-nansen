import React from 'react'
import Link from 'next/link'
import {Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, DrawerCloseButton, Flex, Image, List, ListItem, Heading, Text, Icon, useDisclosure, useColorMode, useColorModeValue, VStack, Container, Center, Spacer} from '@chakra-ui/react'
import {MoonIcon, SunIcon} from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'
import {BsArrowUpLeft} from 'react-icons/bs'
import Headroom from 'react-headroom'
import { HamburgerIcon } from '@chakra-ui/icons'
import {imageBuilder} from '../../lib/sanity'

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

  const {title, logo, mainNavigation, footer} = props

  return (
    <Flex 
      as="header"
      overflowX="scroll"
      gridArea={{base: "header", md: "nav"}}
      direction={{base: "row", md: "column"}}
      align="start" 
      h="full" 
      pr={["0", "2", "5", "5"]}
      px={["0", "2", "10", "10"]}
      py={["0", "2", "5", "5"]}
      justify="flex-start"
      wrap="wrap"
      color={color}
      bg="rgba(255,255,255,0.5)"
      zIndex="2"
      color="gray.600"
      boxShadow="lg"
      justifyContent="center"
    >

      <Image src={imageBuilder.image(logo).width(200).height(200).flipHorizontal().url()} alt="site logo" mb="10" />

      <Heading fontSize={["xl", "2xl", "2xl", "3xl"]} fontFamily="EB Garamond">
        <Link href="/">
          <a>{title}</a>
        </Link>
      </Heading>
      
      <Spacer display={{base: 'inherit', md:'none'}} />

      <Button
        display={{base: 'inherit', md:'none'}}
        px="2"
        alignSelf="flex-end"
        variant="link"
        onClick={() => onOpen()}
      >
        <Icon color="gray.500" w={8} h={8} as={HamburgerIcon} />
      </Button>

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

      <Flex mt="5" display={{ base: "none", md: "flex" }} direction="column">
        <List styleType="upper-latin" spacing="1" fontSize={["md", "md", "md", "lg"]}>
        {footer.navMenu?.items && footer.navMenu.items.map((item) => (
            <ListItem key={item._key}>
              <ActiveLink fontFamily="'Open Sans'" href={`/${item.route ?? ''}`} activeClassName="active">
                <a>{item.label}</a>
              </ActiveLink>
            </ListItem>
          ))}
        </List>
      </Flex>

      <Button 
        display={{base: 'none', md:'inherit'}}
        mt="5" 
        h="8" 
        w="4" 
        onClick={toggleColorMode}
      >
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>

      <Drawer 
        placement="top" 
        onClose={onClose} 
        isOpen={isOpen} 
        size="full" 
        onOverlayClick={onClose}
        motionPreset="scale"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            {/* <DrawerHeader>Nav</DrawerHeader> */}
            <DrawerBody>

              <Center h="full" w="full">
                <VStack align="stretch">
                  <Flex wrap="wrap" justifyContent="center" direction={{ base: "column", md: "row" }}>
                    {mainNavigation?.items && mainNavigation.items.map((item) => (
                      <MenuItem key={item._key}>
                        <ActiveLink passHref href={`/${item.route}`} activeClassName="active">
                          <a onClick={onClose}>{item.label}</a>
                        </ActiveLink>
                      </MenuItem>
                    ))}
                  </Flex>

                  <Spacer />
                  
                  <Flex wrap="wrap" justifyContent="center" direction={{ base: "column", md: "row" }}>
                    {footer.navMenu?.items && footer.navMenu.items.map((item) => (
                      <MenuItem key={item._key}>
                        <ActiveLink passHref href={`/${item.route}`} activeClassName="active">
                          <a onClick={onClose}>{item.label}</a>
                        </ActiveLink>
                      </MenuItem>
                    ))}
                  </Flex>

                  <Spacer />

                  <Flex justifyContent="center">
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
