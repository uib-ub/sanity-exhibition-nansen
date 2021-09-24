import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  Flex,
  List,
  ListItem,
  Icon,
  useDisclosure,
  VStack,
  Center,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { HamburgerIcon } from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'

export default function DrawerMenu(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mainNavigation, footer } = props

  return (
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
  )
}
