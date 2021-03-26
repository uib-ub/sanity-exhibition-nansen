import { Box, Button, Flex, Grid, useDisclosure} from '@chakra-ui/react'
import Alert from '../Alert'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'
import {useEffect, useState} from 'react'
import Router from 'next/router'

export default function Layout({alert, preview, children, site}) {
  const { isOpen, onToggle } = useDisclosure({defaultIsOpen: true})
  const {footer} = site

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  
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
          {loading ? (
            <h1>Loading...</h1>
          ) : null}
          {children}
        </Box>

        {/* <Footer 
          {...footer} 
        /> */}
      </Grid>
    </>
  )
}
