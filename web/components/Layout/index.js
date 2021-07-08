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
        gridArea={{base: 'header'}}
        data={{...site}}
      />
      
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
