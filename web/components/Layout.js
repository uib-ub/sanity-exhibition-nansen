import { Box, Grid, Flex, Text, Spacer, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, DrawerCloseButton, Icon, useDisclosure, Center, VStack, Divider, Heading, Link } from '@chakra-ui/react'
import {BsArrowUpLeft} from 'react-icons/bs'
import { HamburgerIcon } from '@chakra-ui/icons'
import ActiveLink from './ActiveLink'
import Alert from './Alert'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'

const MenuItem = ({children}) => (
  <Text mt={{base: 4, md: 0}} mr={6} mb="0" display="block">
    {children}
  </Text>
)

export default function Layout({alert, preview, children, site}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {mainNavigation, footer} = site
  
  return (
    <>
      <Grid
        w="100vw"
        h="100vh"
        gridTemplateAreas={{xl: '"header header" "main nav" "footer footer"', base: '"header header" "main nav" "footer footer"'}}
        gridTemplateColumns={{base: "8fr 0px", md: "7fr 2fr"}}
        autoRows="max-content"
        overflowY="scroll"
        templateRows="auto 1fr auto"
      >
        <Meta />
        <Alert preview={(alert, preview)} />
        
        <Button
            position="fixed"
            top="5"
            right="5"
            zIndex="101"
            px="2"
            variant="link"
            onClick={() => onOpen()}
          >
            <Icon color="gray.500" w={8} h={8} as={HamburgerIcon} />
        </Button>

        <Header {...site} />
        
        <Box
          w="full"
          as="main" 
          gridArea="main" 
          pb="10" 
          overflowY="scroll"
          boxShadow="dark-lg"
        >
          {children}
        </Box>

        <Footer 
          {...footer} 
        />
      </Grid>

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
    </>
  )
}
