import React from 'react'
import Link from 'next/link'
import {Box, Button, Drawer, Container, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, DrawerCloseButton, Flex, Image, List, ListItem, Menu, MenuButton, MenuList, MenuItem, Heading, Text, Icon, useDisclosure, useColorMode, useColorModeValue, VStack, Center, Spacer, DrawerFooter, Tag, Avatar, TagLabel, HStack} from '@chakra-ui/react'
import {CloseIcon, MoonIcon, SunIcon, ChevronDownIcon} from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'
import { HamburgerIcon } from '@chakra-ui/icons'
import {imageBuilder} from '../../lib/sanity'
import License from '../License'

/* const MenuItem = ({children}) => (
  <Text mt={{base: 4, md: 0}} mr={6} mb="0" display="block">
    {children}
  </Text>
) */

export default function Header(props) {
  if(!props) {
    return null
  }
  
  const {colorMode, toggleColorMode} = useColorMode()
  const color = useColorModeValue('black', 'white')
  const bgcolor = useColorModeValue('white', 'black')
  const inverse = useColorModeValue('invert(0%)', 'invert(85%)')
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const {data, ...rest} = props
  const {title, logo, mainNavigation, footer, publisher, license} = data

  return (
    <Container
      py="3"
      maxW="6xl"
      >
      <Flex
        as="header"
        borderBottom="solid 1px "
        {...rest}
      >
        <Flex
          direction="column"
        >
          <Heading 
            fontSize={['lg', 'xl', '3xl', '3xl']} 
            fontWeight={{base: 'normal', md: 'semibold'}} 
            fontFamily="EB Garamond"
            px={{base: '5', md: '0'}}
          >
            <Link href="/">
              <a>{title}</a>
            </Link>
          </Heading>
          {/* <Image
            src={imageBuilder.image(logo).height(100).flipHorizontal().url()} 
            alt="site logo" 
            mb={{base: '0', md: '10'}} 
            h={{base: '25px', md: '100'}} 
            filter={inverse}
          /> */}
        </Flex>

        <Spacer />
        
        <Flex 
          as="nav"
        >
          <Menu placement="bottom">
            <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
              {title}
            </MenuButton>
            <MenuList pl="10" as={List} listStylePosition="inside" styleType="lower-roman" spacing="1" fontSize={['md', 'md', 'lg', 'lg']}>
              {mainNavigation?.items && mainNavigation.items.map((item) => (
                <MenuItem as={ListItem} key={item._key}>
                  <ActiveLink href={`/${item.route}`} activeClassName="active">
                    <a>{item.label}</a>
                  </ActiveLink>
                  
                  {/* {item.children && (
                    <MenuList styleType="circle" ml="4" fontSize={['sm', 'sm', 'md', 'md']}>
                      {item.children.map(child => (
                        <MenuItem key={child._key}>
                          <ActiveLink href={`/${child.route}`} activeClassName="active">
                            <a>{child.label}</a>
                          </ActiveLink>
                        </MenuItem>
                      ))}
                    </MenuList>
                  )} */}
                </MenuItem>
              ))}
              {footer.navMenu?.items && footer.navMenu.items.map((item) => (
                <MenuItem key={item._key}>
                  <ActiveLink href={`/${item.route}`} activeClassName="active">
                    <a>{item.label}</a>
                  </ActiveLink>

                  {/* {item.children && (
                    <List styleType="circle" ml="4" fontSize={["sm", "sm", "md", "md"]}>
                      {item.children.map(child => (
                        <MenuItem key={child._key}>
                          <ActiveLink href={`/${child.route}`} activeClassName="active">
                            <a>{child.label}</a>
                          </ActiveLink>
                        </MenuItem>
                      ))}
                    </List>
                  )} */}
                </MenuItem>
              ))}
              <Button 
                display={{base: 'none', md:'inherit'}}
                mt="2"
                p="0" 
                h="5" 
                w="1" 
                onClick={toggleColorMode}
              >
                {colorMode === 'light' ? <MoonIcon w={3} h={3} /> : <SunIcon w={3} h={3} />}
              </Button>
            </MenuList>
          </Menu>

        </Flex>
        
        <Spacer />

{/*         <Box ml="-5" display={{base: 'none', md: 'inherit'}}>
          {publisher && publisher.map(p =>
            <Container key={p._id} fontSize="xs" p="0" centerContent>
              <Image
                boxSize="50px"
                filter={inverse}
                src={imageBuilder
                  .image(p.image)
                  .height(50)
                  .width(50)
                  .url()}
              />
              <Link href={`/id/${p._id}`}>{p.label.no}</Link>
            </Container>
          )}
        </Box>
        <HStack ml="-5" display={{base: 'none', md: 'inherit'}}>
          <License license={license} />
        </HStack> */}

      </Flex>

      <Box
        position="fixed"
        bottom="5"
        right="5"
        zIndex="2000"
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
                      <List styleType="lower-roman" spacing="1" fontSize={['lg', 'xl']}>
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
                      <List styleType="upper-latin" spacing="1" fontSize={['lg', 'xl']}>
                        {footer.navMenu?.items && footer.navMenu.items.map((item) => (
                          <ListItem key={item._key}>
                            <ActiveLink href={`/${item.route}`} activeClassName="active">
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
    </Container>
  )
}
