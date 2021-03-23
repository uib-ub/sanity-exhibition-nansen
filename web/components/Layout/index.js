import { Box, Grid} from '@chakra-ui/react'
import Alert from '../Alert'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'


export default function Layout({alert, preview, children, site}) {
  const {footer} = site
  
  return (
    <>
      <Grid
        w="100vw"
        h="100vh"
        gridTemplateAreas={{xl: '"header header" "nav main"', base: '"header header" "nav main"'}}
        gridTemplateColumns={{base: "0px 8fr", md: "auto 1fr", xl: "auto 1fr"}}
        autoRows="max-content"
        overflowY="scroll"
        templateRows="auto 1fr"
      >
        <Meta />
        <Alert preview={(alert, preview)} />

        <Header {...site} />
        
        <Box
          w="full"
          as="main" 
          gridArea="main" 
          pb="10"
          overflowY="scroll"
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
