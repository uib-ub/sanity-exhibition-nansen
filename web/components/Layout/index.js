import { Box, Button, Flex, Grid, Text, useDisclosure} from '@chakra-ui/react'
import Alert from '../Alert'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'
import {useEffect, useState} from 'react'
import Router from 'next/router'

export default function Layout({alert, preview, children, site}) {
  const { isOpen, onToggle } = useDisclosure({defaultIsOpen: true})
  const {footer} = site

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      /* console.log("start"); */
      setLoading(true)
    }
    const end = () => {
      /* console.log("findished"); */
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
  
  return (
    <>
      <Meta />
      <Alert preview={(alert, preview)} />

      <Header 
        gridArea={{base: 'header', md: 'nav'}}
        ml={{base: '0', md: isOpen ? '0' : '-400px'}}
        visibility={{base: 'visible', md:isOpen ? 'visible' : 'hidden'}}
        opacity={{base: '1', md:isOpen ? '1' : '0'}}
        transition="opacity 0.5s 0.5s, margin-left 0.5s 0s"
        data={{...site}}
      />

      <Flex
        position="sticky"
        top="0"
        gridArea="toggle"
        h="100vh"
        pr={!isOpen ? {md:'2'} : {}}
        transition="padding-right 0.3s" 
        overflowY="hidden"
        zIndex="1"
        direction="column"
        justifyContent="center"
        borderRight="thin solid"
        borderColor="gray.300"
        sx={{boxShadow: '5px 0 10px -10px #444'}}
        onClick={onToggle}
      >
        <Text
          m="0"
          opacity={{base: '0', md:isOpen ? '0' : '1'}}
          transition="opacity 0.5s 0.5s" 
          sx={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}
        >
          Nansen
        </Text>
        <Button
          fontSize="3xl"
          variant="link"
          onClick={onToggle}
          outline="none"
          my="5"
          _hover={{ textDecoration:'none' }}
          _focus={{ boxShadow:'none' }}
        >
          ⋮
        </Button>
        <Text 
          m="0"
          opacity={{base: '0', md:isOpen ? '0' : '1'}}
          transition="opacity 0.5s 0.5s" 
          sx={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}
        >
          Innholdsfortegnelse
        </Text>
      </Flex>
      
      <Box
        as="main" 
        gridArea="main" 
        w="full"
      >
        {/* {loading ? (
          <h1>Loading...</h1>
        ) : null} */}
        {children}
      </Box>

      {/* <Footer 
        {...footer} 
      /> */}
    </>
  )
}
