import React from 'react'
import Link from 'next/link'
import {Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, DrawerCloseButton, Flex, Image, List, ListItem, Heading, Text, Icon, useDisclosure, useColorMode, useColorModeValue, VStack, Container, Center, Spacer, DrawerFooter} from '@chakra-ui/react'
import {CloseIcon, MoonIcon, SunIcon} from '@chakra-ui/icons'
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
  
  const {data, ...rest} = props
  const {title, logo, mainNavigation, footer} = data

  return (
    <>
      <Flex
        flexWrap="nowrap"
        overflowX="scroll"
        as="header"
        direction={{base: "row", md: "column"}}
        align="start" 
        w="full"
        h="full"
        pl={["2", "2", "10", "10"]}
        py={["2", "2", "5", "5"]}
        justify="flex-start"
        wrap="wrap"
        color={color}
        bg="rgba(255,255,255,0.5)"
        borderBottom={{base: "1px solid", md: "none"}}
        borderColor="gray.200"
        boxShadow={{base: "xl", md: "none"}}
        zIndex="2"
        justifyContent="center"
        {...rest}
      >

        <Image
          src={imageBuilder.image(logo).height(200).flipHorizontal().url()} 
          alt="site logo" 
          mb={{base: "0", md: "10"}} 
          h={{base: "25px", md: "200"}} 
          display={{base: "none", md: "inherit"}} 
        />

        <Heading 
          fontSize={["lg", "xl", "2xl", "3xl"]} 
          fontWeight={{base: "normal", md: "semibold"}} 
          fontFamily="EB Garamond"
          px={{base: "5", md: "0"}}
        >
          <Link href="/">
            <a>{title}</a>
          </Link>
        </Heading>
        
        <Flex 
          as="nav"
          display={{ base: "none", md: "flex" }} 
          direction="column"
          flexWrap="nowrap" 
        >
          <List styleType="lower-roman" spacing="1" fontSize={["md", "md", "md", "lg"]}>
            {mainNavigation?.items && mainNavigation.items.map((item) => (
              <ListItem key={item._key}>
                <ActiveLink href={`/${item.route}`} activeClassName="active">
                  <a>{item.label}</a>
                </ActiveLink>
              </ListItem>
            ))}
          </List>

          <List mt="5" styleType="upper-latin" spacing="1" fontSize={["md", "md", "md", "lg"]}>
          {footer.navMenu?.items && footer.navMenu.items.map((item) => (
              <ListItem key={item._key}>
                <ActiveLink href={`/${item.route ?? ''}`} activeClassName="active">
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

        
      </Flex>
      <Box
        position="fixed"
        bottom="5"
        right="5"
        zIndex="1000"
      >
        <Button
          w="12"
          h="12"
          display={{base: 'block', md:'none'}}
          borderRadius="full"
          colorScheme="red"
          boxShadow="dark-lg"
          alignSelf="flex-start"
          onClick={() => onOpen()}
          leftIcon={<Icon color="white" h="12" w="8" ml="-2" as={HamburgerIcon} />}
        />
        <Drawer 
          placement="bottom" 
          onClose={onClose} 
          isOpen={isOpen} 
          size="full" 
          onOverlayClick={onClose}
          motionPreset="scale"
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                <Center h="full" w="full">
                  <VStack align="stretch">
                  <Flex flexWrap="nowrap" direction="column">
                    <List styleType="lower-roman" spacing="1" fontSize={["lg", "xl"]}>
                      {mainNavigation?.items && mainNavigation.items.map((item) => (
                        <ListItem key={item._key}>
                          <ActiveLink href={`/${item.route}`} activeClassName="active">
                            <a onClick={onClose}>{item.label}</a>
                          </ActiveLink>
                        </ListItem>
                      ))}
                    </List>
                  </Flex>

                  <Flex mt="5" direction="column">
                    <List styleType="upper-latin" spacing="1" fontSize={["lg", "xl"]}>
                    {footer.navMenu?.items && footer.navMenu.items.map((item) => (
                        <ListItem key={item._key}>
                          <ActiveLink href={`/${item.route ?? ''}`} activeClassName="active">
                            <a onClick={onClose}>{item.label}</a>
                          </ActiveLink>
                        </ListItem>
                      ))}
                    </List>
                  </Flex>
                    {/* <Flex wrap="wrap" justifyContent="center" direction={{ base: "column", md: "row" }}>
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
                    </Flex> */}
                  </VStack>
                </Center>
                
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
          <Button
            position="fixed"
            bottom="5"
            right="5"
            w="12"
            h="12"
            borderRadius="full"
            colorScheme="red"
            boxShadow="dark-lg"
            onClick={() => onClose()}
            zIndex="20000"
            leftIcon={<Icon color="white" h="5" w="6" ml="2" as={CloseIcon} />}
          />
        </Drawer>
      </Box>
    </>
  )
}
