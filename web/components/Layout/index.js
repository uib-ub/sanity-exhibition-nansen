import { Box } from '@chakra-ui/react'
import Alert from './Alert'
import Header from './Header'
import Meta from './Meta'
import Footer from './Footer'

export default function Layout({ preview, children, site }) {
  return (
    <>
      <Meta />
      {preview && <Alert gridArea={{ base: 'alert' }} />}

      <Header gridArea={{ base: 'header' }} data={{ ...site }} />

      <Box as="main" gridArea="main" w="full" mt="14">
        {/* {loading ? (
          <h1>Loading...</h1>
        ) : null} */}
        {children}
      </Box>

      <Footer {...site.footer} license={site.license} publisher={site.publisher} />
    </>
  )
}
