import { Box, Button, Flex, Grid, useDisclosure} from '@chakra-ui/react'
import Alert from '../Alert'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'


export default function Layout({alert, preview, children, site}) {
  const { isOpen, onToggle } = useDisclosure({defaultIsOpen: true})
  const {footer} = site
  
  return (
    <>
      <Grid
        w="100vw"
        h="100vh"
        gridTemplateAreas={{base: '"header header header" "nav toggle main"', xl: '"header header header" "nav toggle main"'}}
        gridTemplateColumns={{base: "0px 0px 8fr", md: "auto auto 1fr", xl: "auto auto 1fr"}}
        autoRows="max-content"
        overflowX="hidden"
        templateRows="auto 1fr"
      >
        <Meta />
        <Alert preview={(alert, preview)} />

        <Header 
          gridArea={{base: "header", md: "nav"}}
          ml={{base: "0", md: isOpen ? "0" : "-400px"}}
          visibility={{base: "visible", md:isOpen ? "visible" : "hidden"}}
          opacity={{base: "1", md:isOpen ? "1" : "0"}}
          transition="opacity 0.5s 0.5s, margin-left 0.5s 0s"
          data={{...site}}
        />

        <Flex
          gridArea="toggle"
          overflowY="hidden"
          zIndex="1"
          sx={{boxShadow: "5px 0 10px -10px #444"}}
        >
          <Button
            /* placeSelf="flex-end" */
            fontSize="3xl"
            variant="link"
            onClick={onToggle}
            outline="none"
            _hover={{ textDecoration:"none" }}
            _focus={{ boxShadow:"none" }}
          >
            ⋮
          </Button>
        </Flex>
        
        <Box
          as="main" 
          gridArea="main" 
          w="full"
          pb="10"
          overflowY="scroll"
          /* overflowX="hidden" */
        >
          {children}
        </Box>

        {/* <Footer 
          {...footer} 
        /> */}
      </Grid>
    </>
  )
}
