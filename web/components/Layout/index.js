import { Box } from '@chakra-ui/react'
import Alert from '../Alert'
// import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'

export default function Layout({ alert, preview, children, site }) {
  return (
    <>
      <Meta />
      <Alert preview={(alert, preview)} />

      <Header gridArea={{ base: 'header' }} data={{ ...site }} />

      <Box as="main" gridArea="main" w="full" mt="14">
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
