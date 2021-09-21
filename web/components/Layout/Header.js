import React from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Drawer,
  Container,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  Flex,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Heading,
  Icon,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  VStack,
  Center,
  Spacer,
  // Image,
} from '@chakra-ui/react'
import { CloseIcon, ChevronDownIcon } from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'
import { HamburgerIcon } from '@chakra-ui/icons'
import NightIcon from './NightIcon'
import DayIcon from './DayIcon'
// import { imageBuilder } from '../../lib/sanity'

export default function Header(props) {
  if (!props) {
    return null
  }

  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bg = useColorModeValue('white', 'gray.800')

  const { data, ...rest } = props
  const { title, /* logo, */ mainNavigation, footer } = data

  return (
    <Container pt="3" maxW="full" bgColor={bg} margin="auto">
      <Flex as="header" pb="1" borderBottom="solid 1px " {...rest}>
        <Flex direction="row" alignItems="center">
          {/* <Image
            src={imageBuilder.image(logo).height(100).url()}
            alt="site logo"
            h={{ base: '25px' }}
            mr="4"
          /> */}
          <Heading
            fontSize={['lg', 'xl', '2xl', '2xl']}
            fontWeight={{ base: 'normal', md: 'semibold' }}
            fontFamily="EB Garamond"
          >
            <Link href="/">
              <a>{title}</a>
            </Link>
          </Heading>
        </Flex>

        <Spacer />

        <Flex as="nav">
          <Menu placement="bottom">
            <MenuButton as={Button} variant="link" rightIcon={<ChevronDownIcon />}>
              Innholdsfortegnelse
            </MenuButton>
            <MenuList
              pl="10"
              as={List}
              styleType="lower-roman"
              spacing="1"
              fontSize={['md', 'md', 'lg', 'lg']}
            >
              {mainNavigation?.items &&
                mainNavigation.items.map((item) => (
                  <MenuItem as={ListItem} display="list-item" key={item._key}>
                    <ActiveLink href={`/${item.route}`} activeClassName="active">
                      <a>{item.label}</a>
                    </ActiveLink>

                    {/* {item.children && (
                      <MenuList styleType='circle' ml='4' fontSize={['sm', 'sm', 'md', 'md']}>
                      {item.children.map(child => (
                        <MenuItem key={child._key}>
                        <ActiveLink href={`/${child.route}`} activeClassName='active'>
                        <a>{child.label}</a>
                        </ActiveLink>
                        </MenuItem>
                        ))}
                        </MenuList>
                      )} */}
                  </MenuItem>
                ))}

              <MenuDivider />

              {footer.navMenu?.items &&
                footer.navMenu.items.map((item) => (
                  <MenuItem
                    as={ListItem}
                    display="list-item"
                    sx={{ listStyleType: 'disc' }}
                    key={item._key}
                  >
                    <ActiveLink href={`/${item.route}`} activeClassName="active">
                      <a>{item.label}</a>
                    </ActiveLink>
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        </Flex>

        <Button display={{ base: 'none', md: 'inherit' }} px="0" ml="5" onClick={toggleColorMode}>
          {colorMode === 'light' ? (
            <Icon as={NightIcon} w={16} h={16} />
          ) : (
            <Icon as={DayIcon} w={16} h={16} color="white" />
          )}
        </Button>

        {/*  <Box ml='-5' display={{ base: 'none', md: 'inherit' }}>
          {publisher && publisher.map(p =>
            <Container key={p._id} fontSize='xs' p='0' centerContent>
              <Image
                boxSize='50px'
                // filter={inverse}
                src={imageBuilder
                  .image(p.image)
                  .height(50)
                  .width(50)
                  .url()}
              />
              <Link href={`/id/${p._id}`}>{p.label.no}</Link>
            </Container>
          )}
        </Box> */}
      </Flex>

      <Box position="fixed" bottom="5" right="5" zIndex="2000">
        <Button
          w="12"
          h="12"
          display={{ base: 'block', md: 'none' }}
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
                        {mainNavigation?.items &&
                          mainNavigation.items.map((item) => (
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
                        {footer.navMenu?.items &&
                          footer.navMenu.items.map((item) => (
                            <ListItem key={item._key}>
                              <ActiveLink href={`/${item.route}`} activeClassName="active">
                                <a onClick={onClose}>{item.label}</a>
                              </ActiveLink>
                            </ListItem>
                          ))}
                      </List>
                    </Flex>
                    {/* <Flex wrap='wrap' justifyContent='center' direction={{ base: 'column', md: 'row' }}>
                      {mainNavigation?.items && mainNavigation.items.map((item) => (
                        <MenuItem key={item._key}>
                          <ActiveLink passHref href={`/${item.route}`} activeClassName='active'>
                            <a onClick={onClose}>{item.label}</a>
                          </ActiveLink>
                        </MenuItem>
                      ))}
                    </Flex>

                    <Spacer />
                    
                    <Flex wrap='wrap' justifyContent='center' direction={{ base: 'column', md: 'row' }}>
                      {footer.navMenu?.items && footer.navMenu.items.map((item) => (
                        <MenuItem key={item._key}>
                          <ActiveLink passHref href={`/${item.route}`} activeClassName='active'>
                            <a onClick={onClose}>{item.label}</a>
                          </ActiveLink>
                        </MenuItem>
                      ))}
                    </Flex>

                    <Spacer />

                    <Flex justifyContent='center'>
                      <Heading fontSize='sm' fontWeight='500'>
                        <Link href='http://marcus.uib.no/'>
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
