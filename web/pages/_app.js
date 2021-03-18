import {useEffect} from 'react'
import '../styles/index.css'
import {ChakraProvider} from '@chakra-ui/react'
import theme from '../theme'
import { useRouter } from "next/router";

function MyApp({Component, pageProps}) {
  const router = useRouter();


  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
