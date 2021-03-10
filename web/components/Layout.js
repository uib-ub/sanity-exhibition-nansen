import { Box, Grid, Heading } from '@chakra-ui/react'
import Alert from './Alert'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'

export default function Layout({alert, preview, children, site}) {
  const {footer} = site
  return (
    <Grid
      w="full"
      h="100vh"
      gridTemplateAreas={{xl: '"header" "main" "footer"', base: '"header" "main" "footer"'}}
      gridTemplateColumns="1fr"
      gridTemplateRows="auto auto auto"
    >
      <Meta />
      <Alert preview={(alert, preview)} />

      <Header {...site} />
      
      <Box as="main" gridArea="main" overflow="scroll">
        {children}
      </Box>

      <Footer {...footer} />

    </Grid>
  )
}
